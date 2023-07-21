
## Table of Contents

* [Installation](https://chat.openai.com/#installation)
  * [Docker](https://chat.openai.com/#docker)
* [Building the Docker Image](https://chat.openai.com/#building-the-docker-image)

## Installation

To get started with this project, you'll need to install `Docker`. Follow the instructions below based on your operating system:


### Docker

Follow the official Docker installation guide to install Docker for your operating system: [Docker Installation Guide](https://docs.docker.com/get-docker/).

## Building the Docker Image

Once you have `Docker` installed, follow these steps to build the Docker image for this project:

1. Clone this repository to your local machine.
2. Open a terminal (or command prompt) and navigate to the project directory.
3. Create a .env file at the root directory and add the national instance server url value for this variable ```REACT_APP_API_URL```
6. Run the following `docker` command to build the Docker image:

   <pre><div class="bg-black rounded-md mb-4"><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-bash">./run.sh 
   </code></div></div></pre>

   This command will execute the build process and create a Docker image for the project.
7. After the build process is completed, you can run the Docker image using the following command:

   <pre><div class="bg-black rounded-md mb-4"><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-bash">docker run -p 3001:3001 pss-survey
   </code></div></div></pre>

   This command will start the containerized application and expose it on port 3001 of your local machine. You can now access the application by navigating to http://localhost:3001 in your browser.

Now you have successfully built and run the Docker image for the Project Name project. Happy coding!

<!-- NB -->

Note: If you are getting `permission denied` error while running the `run.sh` script, then you need to give execute permission to the script. You can do that by running the following command:
  <pre><div class="bg-black rounded-md mb-4"><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-bash">sudo chmod 755 ./run.sh
   </code></div></div></pre>