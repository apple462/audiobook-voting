# audiobook-voting
Audiobook Voting Application

To run the project locally, ensure that you have node and python installed on your system.

Project Structure:
1. Backend is managed in the 'app' folder.
2. Frontend is managed in the 'app' folder.

To run the project locally:
1. Clone the github repo.
2. Navigate to the cloned folder and open a terminal.
3. Enter the following commands sequentially:
    a. Enter the command "cd api"
    b. Create a new virtual environment using 'python3 -m venv .env'
    c. Enter this environment using 'source .env/bin/activate'
    d. Download all requirements using 'pip install -r requirements.txt'
    e. Now that the setup is complete, run the backend using the command 'python app.py'
    f. Your backend is now running on localhost:5000
4. Open a new terminal and enter the following commands sequentially:
    a. Enter the command "cd app"
    b. Enter the command "npm i" to install all the node modules
    c. Now that the setup is complete, run the frontend using the command 'npm start'
    d. Your frontend is now running on localhost:3000
