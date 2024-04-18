(async () => {
  const fs = require('fs');
  const wae = require('web-audio-engine');

  // Define paths for MP3 and WAV files
  const mp3FilePath = "C:/Users/islis/Desktop/mp3-to-wav/I Won't.mp3";
  const wavFilePath = "C:/Users/islis/Desktop/mp3-to-wav/I_Won't.wav";

  // Read the MP3 file
  const buffer = fs.readFileSync(mp3FilePath);
  console.log('MP3 file read successfully');

  // Dynamic import of audio-decode
  const { default: decodeAudio } = await import('audio-decode');

  try {
    // Decode the MP3 file using audio-decode
    console.log('Decoding MP3 file...');
    const audioData = await decodeAudio(buffer);

    if (audioData) {
      console.log('MP3 file decoded successfully');

      // Now you have the decoded audio data, use it for further processing
      const decodedBuffer = await audioData;
      console.log('Decoded buffer:', decodedBuffer); // Log the decoded buffer

      if (decodedBuffer) {
        console.log('Encoding decoded buffer to WAV...');
        const arrayBuffer = wae.encoder.encode(decodedBuffer, { type: 'wav' }).then((arrayBuffer) => {
          fs.writeFileSync(wavFilePath, Buffer.from(arrayBuffer));
          console.log('WAV file created successfully:', wavFilePath);
        });
      } else {
        console.error('Empty decoded buffer. Skipping WAV file creation.');
      }
    } else {
      console.error('Error decoding MP3 file.');
    }
  } catch (error) {
    console.error('Error during conversion:', error);
    // Handle decoding or encoding errors (optional)
  }
})();
