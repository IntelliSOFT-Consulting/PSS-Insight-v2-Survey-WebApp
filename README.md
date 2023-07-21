
## Table of Contents

* [Installation](https://chat.openai.com/#installation)
  * [Make](https://chat.openai.com/#make)
  * [Docker](https://chat.openai.com/#docker)
* [Building the Docker Image](https://chat.openai.com/#building-the-docker-image)

## Installation

To get started with this project, you'll need to install `make` and `Docker`. Follow the instructions below based on your operating system:

### Make

#### Windows

1. Download the Make installer for Windows from the official GnuWin32 project: [GnuWin32 Make](http://gnuwin32.sourceforge.net/packages/make.htm).
2. Run the installer and follow the on-screen instructions to complete the installation.
3. Add the installation directory (e.g., `C:\Program Files (x86)\GnuWin32\bin`) to your system's PATH environment variable.

#### macOS

1. On macOS, `make` is already installed by default. You can verify this by opening the Terminal and typing `make --version`.

#### Linux

1. On most Linux distributions, `make` comes pre-installed. You can verify this by opening the Terminal and typing `make --version`.

### Docker

Follow the official Docker installation guide to install Docker for your operating system: [Docker Installation Guide](https://docs.docker.com/get-docker/).

## Building the Docker Image

Once you have `make` and `Docker` installed, follow these steps to build the Docker image for this project:

1. Clone this repository to your local machine.
2. Open a terminal (or command prompt) and navigate to the project directory.
3. Create a .env file at the root directory and add the national instance server url value for this variable ```REACT_APP_API_URL```
4. run the following command to generate the nginx.conf file:
    <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>bash</span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-bash">./run.sh
    </code></div></div></pre>
6. Run the following `docker` command to build the Docker image:

   <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>bash</span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-bash">docker build -t your-username/pss-survey -f docker/Dockerfile  
   </code></div></div></pre>

   This command will execute the build process and create a Docker image for the project.
7. After the build process is completed, you can run the Docker image using the following command:

   <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>bash</span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-bash">docker run -d -p 3001:3001 your-username/pss-survey
   </code></div></div></pre>

   This command will start the containerized application and expose it on port 3001 of your local machine. You can now access the application by navigating to http://localhost:3001 in your browser.

Now you have successfully built and run the Docker image for the Project Name project. Happy coding!