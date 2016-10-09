WhatsApp Project

the project simply 2 views, conversations view shows a static contacts and the chat details view for preview chat details with each contact.

## Getting Started

The instructions i used for development as follow:

### Prerequisities

1- creat an account on PubNub https://admin.pubnub.com/#/login .
2- Install pubnub-angular plugin to my solution .
3- Include angularjs to the solution . 


### Development

1- Adding design template and editing it using bootstrap.
2- Initializing pubnub in code using publish key and subscribe key that are generated after creating project on pubnub website.
3- Searching alot and reading tutorials about pubnub technique and how to create channel for each chat and detect sender and receiver.
4- So, i created array of objects contains id, name, picture, and channel name for each user on conversations view.
5- Getting chat logs for each user using pubnub API.
6- Sharing images in chat by converting the image to base64 image and send it to channel as an image source.
7- Sharing emoticons in chat by creating symbol for each emoticon and replacing it with real emoticon after publishing to channel.


## Running and Usage

1- Open "197.45.12.35/whatapp_pub" .

2- Click on any user from list, it will open chat window with him, and each user has his own chat.

3- Open a new tab or a new window or another device, and open the same user to see the same window, 
and Now start chatting.

4- Type your text on textarea and press enter or send button, 
your message will be published successfuly in this selected channel.

5- You can 	share image by clicking on the pin, browsing window will open to select your image.
NOTE: shared images MUST  Be at most 32K sized,
because PubNub data stream is for data, not for large payloads such as photos and video streaming.

6- You can share emoticons and here are symbols you can use:
:), :D, :-), :-D, :(, :@, :3a, :V, :O, (Y), :bye:, :laugh:, :coffee:


## References
1- PubNub https://www.pubnub.com/docs/angularjs-javascript/pubnub-javascript-sdk
2- Bootstrap https://v4-alpha.getbootstrap.com/layout/grid/
3- Lodash library https://lodash.com/
4- Emoticons site http://www.pic4ever.com/images/




