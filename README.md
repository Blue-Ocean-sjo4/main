# Correspond - Turn The Page. Meet A Friend.
(Record gif demo and put here, or just put image of home page)

### [Wilson Cheah](https://github.com/chyyeeah), [Teva Dagai](https://github.com/tdagai), [Karim Zamrini](https://github.com/zamrini), [Evan Jordan](https://github.com/evanjordan42), [Adnan Noori](https://github.com/AdnanNoori), [Khoi Dao](https://github.com/Khoidao55), [Jaspreet Atwal](https://github.com/JSAtwal25)


## Introduction
#### Correspond is an international pen-pal application which allows users to connect from anywhere in the world and chat in real time.


## What does the app do?
- Allow users to select any country and connect with a user from that country
- Gives users the ability to chat instantly and share stories or media
- Provides open space to meet people from other cultures and share about anything
- Users can control their connections by accepting or declining requests, or removing current connections


## Tech Stack
<p align="center">
  <img src="https://cdn.discordapp.com/attachments/827288263110295586/830505317182734396/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f6d61782f3730302f302a55714779596d574352516e6a4c7a536b.png">
</p>


## Technical challenges we anticipated
- Allowing users to chat instantly - we planned to use web sockets to render messages in real time, while also saving them to the database for users to access during later correspondence
- Authenticating users - our team discussed using Passport.js for login authentication and hashing passwords before storing on the server to secure user information


## Unexpected challenges
- why was it a challenge
- what did you learn?

## Video demo / screenshot walkthrough
- user stories (record video and put here)

## How does the app work?
- What happens behind the scenes when the user interacts with it?
- When a user signs up, their data is stored securely in a MongoDB cloud database.
- After logging in, credentials are checked to ensure validation. Upon success, the user is given an authentication token which allows them to use the application for that session.
- At the home page, a user is presented with all of their current connections and a navigation bar to move across the website. If a user doesn't have any connections yet, they are prompted to use the "add a new pal" feature to start reaching out to other users.
- The navigation bar allows users to add new connections, logout, or link to the other pages: Home, Notifications, and Profile.
- The notifications page displays all incoming connections and allows uers to accept or decline pal requests.
- When visiting the profile page, a user is presented with all of their profile data. Additionally, users can upload profile pictures, change user information, and update a short bio about themselves.
- Users can click on their connections to open a messages page which allows them to chat in real time if the other user is logged in. If they aren't logged in their messages will be saved and displayed to that connection the next time they log in and check the chat!


## What research was required?
- Integrating web sockets
- Authenticating user sessions
- How to display more aesthetic notifications


## Workflow and key lessons
- Your git workflow, style guides, commit guides, etc
- What did you learn from the process
- What were key takeaways from stand ups, code reviews, etc
- Writing tests
- Link to your trello board, discuss completed tickets

## Notes from sprint retro

## Additional features planned
- Future refactoring?
- Additional dev ops considerations?
- UI/UX additions?
