import { useRouteError } from "react-router";
const Error = () => {
    const err = useRouteError();
    return(
        <div className="error-page">
            <h1>404 - Page Not Found</h1>
            <h2>We are sorry, the page you requested could not be found.</h2>
            <h3>{err.status} - {err.statusText}</h3>
        </div>
    )
}

export default Error;