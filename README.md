This application is deployed to Heroku and can be viewed at **https://fierce-brushlands-92820.herokuapp.com/**

The following credentials can be used for viewing the functionalities:

1. User

    USERNAME : **user**
    
    PASSWORD : **pass1234**

2. Admin

    USERNAME : **admin**
    
    PASSWORD : **pass1234**
    
- - -

## Description
This is a small MERN Stack Web Application called Recipe Book which allows the users to add and view recipes. 
It includes credential-based authentication features for 2 levels of users. The 2 roles and their functionalities are as follows:

1.	**User**

    •	A user can Sign Up and Login using credentials.

    •	The user can view recipes based on category.

    •	The user can add new recipes, which will be visible on the website after approval from Admin.

    •	The user can change login password.

2.	**Admin**

    •	An admin can Login using credentials.
    
    •	The admin can approve/disapprove recipes posted by users.
    
    •	The admin can add, edit and delete categories of food items.
    
    •	The admin can add a new admin.
    
    •	The admin can change login password.
    

**Unauthorised users** can only view recipes.

- - -

For running the app locally follow these steps :

Add a default.json file in config folder with the following code

    {
      "mongoURI": "<your_mongoDB_Atlas_uri_with_credentials>",
      "jwtPrivateKey": "your_private_key”
    }

Install server dependencies

    npm install
    
Install client dependencies

    cd client
    npm install
    
Run both Express & React from root

    npm run dev
