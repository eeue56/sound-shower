# Introduction

[Table of Contents](readme.md) - [Definition](definitions.md)

### Brief

*Design, develop and test a platform which enables the distributed playback of audio based media to a network of localised devices. The platform should be able to handle concurrent asynchronous connections from a large number of devices, enabling usage in events or shows.*

*The applications of this project go from as simple as playing an audio track in sync across a number of devices, to panning a sample across a space (by adjusting the volume on the devices whilst they play the track), to playing a specially composed piece of audio to the network of devices, with different parts playing on specific devices, based on their local position.*
  
### Initial Evaluation

This project will require an interesting balance of asynchronous communication to achieve a synchronous goal. The server should communicate with the devices in an asynchronous manner, to deliver audio and send messages that attempt to ensure that the devices stay in sync with each other.

Audio could be streamed or delivered when the devices connect (depending on how large the library is). One-time delivery will put a larger strain on the server in the connection period, which would be greatly reduced once the session starts, as only small command messages would need to be passed around.

To achieve features like changing the volume of audio, some level of processing would need to be done at the server or on the client. Audio manipulation is a very heavy task and to do it on the fly as it is served would be expensive computationally. It would be ideal if the audio signal could be manipulated at the client instead.

The clients in this project are likely to be mobile devices, meaning that whatever the client side software is written in, it should operate without technical difficulty on a good range of current smart phones.
