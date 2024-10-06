# audiobook-voting
Audiobook Voting Application

To run the project locally, ensure that you have node and python installed on your system.

## Project Structure:
1. Backend is managed in the 'api' folder.
2. Frontend is managed in the 'app' folder.

## To run the project locally:
1. Clone the github repo.
2. Navigate to the cloned folder and open a terminal.
3. Enter the following commands sequentially:
4. Enter the command "cd api"
5. Create a new virtual environment using 'python3 -m venv .env'
6. Enter this environment using 'source .env/bin/activate'
7. Download all requirements using 'pip install -r requirements.txt'
8. Now that the setup is complete, run the backend using the command 'python app.py'
9. Your backend is now running on localhost:5000
10. Open a new terminal and enter the following commands sequentially:
11. Enter the command "cd app"
12. Enter the command "npm i" to install all the node modules
13. Now that the setup is complete, run the frontend using the command 'npm start'
14. Your frontend is now running on localhost:3000


### Note:
When the new db instance will be created, no audiobook entries will be present. Either use a tool like DBBrowser to add some audiobook entries, or use postman to add Audiobooks using the following curl:
curl --location '127.0.0.1:5000/audiobooks' \
--header 'Content-Type: application/json' \
--data '{
    "title": "Becoming",
    "author": "Michelle Obama"
}'
