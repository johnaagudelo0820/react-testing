import React, { useState, useEffect } from 'react';
import superagent from 'superagent';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
];

const Counter = () => {
  const [value, setValue] = useState({ title: 'The Godfather', year: 1972 });
  const [video, setvideo] = useState(null);
  const [downloadVideo, setDownloadVideo] = useState(0);

  useEffect(() => {
    superagent
      .get('https://video-download-gate.s3.amazonaws.com/STORY-LEVIT.mp4.mp4')
      .set('Accept', 'video/mp4')
      .retry(5, (error, data) => {
        debugger;
        console.log(error);
        console.log(data);
      })
      .on('progress', event => {
        console.log(event);
        setDownloadVideo(event.percent.toFixed(2));
        /* the event is:
        {
          direction: "upload" or "download"
          percent: 0 to 100 // may be missing if file size is unknown
          total: // total file size, may be missing
          loaded: // bytes downloaded or uploaded so far
        } */
      })
      .responseType('blob')
      .then((data) => {
        debugger; 
        const sourceVideo = URL.createObjectURL(data.body);
        setvideo(sourceVideo)
      });
  }, []);

  const handleAutocomplete = (e, item) => {
    setValue(item);
  }

  return (
    <>
      {value && (
        <p id="option">{value.title}</p>
      )}
      <h1>{downloadVideo}%</h1>
      <video controls src={video} />
      <Autocomplete
        id="combo-box-demo"
        name="tags"
        debug
        options={top100Films}
        getOptionLabel={option => option.title}
        onChange={handleAutocomplete}
        style={{ width: 300 }}
        renderInput={params => <TextField {...params} label="Combo box" variant="outlined" />}
      />
    </>
  )
}

export default Counter;