# Spotify Social

## Project Description
Spotify Social is an application used to connect Spotify listeners around the world. By logging into your Spotify account through our app, you are agreeing that we can access your listening history, including liked songs, top songs, and top artists. Once logged in, Spotify Social is a place where you can view summaries of your own listening history, as well as explore other peoples’. For anyone who has a public account (which is editable on your profile page), they will be displayed on the Discover page, where other users can see your liked songs, top songs, and top artists. We have also added more social features to the application, such as a Forums page, where people can create forums, as well as create and interact with posts on specific forums. Additionally, we have added a chat feature where you can directly message other users of the application. Overall, the purpose of this app was to make Spotify a more connected experience and to allow for people to connect based on their music choices, which is a space that has been empty for too long now.

## Table of Contents
1. Installation
2. How to Use
3. Major Components and Features
4. Status of Features
5. Credits

### Installation
In the reactSpotify directory: 
run ‘npm install’ 

In the backend directory:
Run ‘npm install’ 

Since the app is still in development mode, there are a few extra steps needed to set up.
1. Go to https://developer.spotify.com/dashboard and log in with your spotify account
2. Click on the ‘create app’ button and set a name and description for your app (you can leave the ‘website’ field blank)
3. In the redirect URI, put “http://localhost:5173” (without quotes) and save the app
4. After you save the app, click on settings in the top right followed by edit at the bottom
5. Add “http://localhost:3000/spotify/callback” (without quotes) to the redirect URI
6. Copy down the client ID and client secret and save the app
7. In the backend directory, add a .env file that has the following two lines of code:

    CLIENT_ID = the client ID you copied down from the app <br/>
    CLIENT_SECRET = the client secret you copied down from the app <br/>
    #### Example .env file: <br/>
    CLIENT_ID = dacb9382e8c09a8f <br/>
    CLIENT_SECRET = djskfjl329n210n40nensk8201j<br/>
To setup the google firebase:
1. Go to https://firebase.google.com/docs/firestore and click ‘go to console’ in the top right corner
2. Sign in with your google account, then click create an app (and fill out the details)
3. Create a firestore database within the project you just created (put it in test mode while still in development)
4. Go to settings -> project settings -> service accounts and click ‘generate a new private key’
5. Take the file that was just downloaded, rename it to ‘permissions.json’, and move it to the backend folder of the code.
6. Change the “project_id” to “projectId” (with quotes)


### How to Use


### Major Components and Features

## In the React Frontend Directory: 
### Liked Songs Page: 
This page will display the user's 50 recent liked songs with name of song, name of artist along with their respective album pictures. It will retrieve the user's liked songs from the Spotify API.


### User's Top Artists Page: 
This page will show the user's top artists based on different time periods: <br/> All Time,<br/>  Last 6 months ,<br/>  and Last Month.<br/>  It will fetch this data from the Spotify API and display top artist and their profile picture.

### User's Top Track’s Page: 
Similar to the top artists page, this page will display the user's top songs based on different time periods. The data will be retrieved from the Spotify API and name of track, artist name and album picture will be displayed



![alt text](/Images/Top.png)




### User Profile Page: 
This page will allow users to view their profile information including their spotify profile picture, name, email. Additionally, users can control the privacy of their profiles using a toggle switch, making them public or private based on their preferences. If they choose to make their profile private, it will hide it from the Discover page.

![alt text](/Images/myProfile.png)


### Discover Page: 
The discover page will display profiles of all public users. Users can click on a profile to view more details such as their top tracks of all time, top artist of all time and liked songs. 


![alt text](/Images/Discover.png)


### Chat Page: 
The chat page will show the user's chats with other users. Users can send messages to each other, creating a communication channel within the application.



![alt text](/Images/Chat.png)

### Forum Page: 
This page will display all the available discussion boards (forums). Users can click on a forum to access the posts within it. Users will also have the ability to search for forums by name, making it easier to find specific topics of interest.



![alt text](/Images/Forums.png)


### Posts Page:
After clicking on specific forum,  users will be able to like posts within forums.

![alt text](/Images/Rap.png)


### Status of Features
Currently, all features are fully functional, with the minor exception of the chat page. We are working on fixing a bug where creating a new chat doesn’t display the first message until the page is refreshed. 


### Credits
This project was contributed by [simonanderson16](https://github.com/simonanderson16), [AfeyaJahin](https://github.com/AfeyaJahin), [yash-d99](https://github.com/yash-d99), and [ka1979](https://github.com/ka1979)
