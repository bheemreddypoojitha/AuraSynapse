# Aura Synapse Mirror | Evol Jewels

This project is an immersive, multi-page style discovery experience for a conceptual jewelry brand, "Evol Jewels." It guides the user through two highly animated and interactive screens to determine their "Style Archetype."

- **IdleScreen:** A visually rich, 3D parallax collage that serves as the entry point.
- **KineticSurvey:** An interactive survey where the user selects their preferred styles from a dynamic, 3D holographic gallery.



## Tech Stack

This project is built with a modern, animation-focused frontend stack:

-   **Framework:** [React](https://reactjs.org/) (with TypeScript)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Styling:** [Styled Components](https://styled-components.com/) for self-contained component styling.
-   **Animation:**
    -   [Framer Motion](https://www.framer.com/motion/) for React-based UI and layout animations.
    -   [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/) for high-performance, complex timeline animations.
-   **Routing:** [React Router](https://reactrouter.com/) for client-side page navigation.

## Getting Started

Follow these instructions to get the project running on your local machine.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (version 18 or higher is recommended) and npm installed on your computer.

-   To check if you have Node.js installed, run this command in your terminal:
    ```bash
    node -v
    ```
-   To check your npm version, run:
    ```bash
    npm -v
    ```

### Installation

1.  **Clone the repository** (or download and extract the project files) into a folder on your computer.

2.  **Navigate to the project directory** in your terminal:
    ```bash
    cd path/to/your/project
    ```

3.  **Install all the necessary dependencies** using npm. This will download all the libraries listed in `package.json` (like React, GSAP, Styled Components, etc.).
    ```bash
    npm install
    ```

### Running the Application

Once the installation is complete, you can start the local development server.

1.  **Run the `dev` command:**
    ```bash
    npm run dev
    ```

2.  **Open your browser:** The terminal will output a local URL, which is usually `http://localhost:8080` or `http://localhost:5173`. Open this URL in your web browser.

You should now see the "Aura Synapse Mirror" application running. The development server will automatically reload the page whenever you make changes to the code.

## Project Structure

-   `public/`: Contains static assets like your `og-image.png` and any font files.
-   `src/`: This is the main folder for all your application code.
    -   `main.tsx`: The main entry point of the application. It sets up the router and renders the `App` component.
    -   `App.tsx`: The root component that defines the application's routing structure.
    -   `pages/`: Contains the primary screen components.
        -   `idlescreen.tsx`: The initial landing page collage.
        -   `KineticSurvey.tsx`: The interactive holographic style selection page.
        -   `RevealScreen.tsx`: The final screen that shows the user's style archetype.
