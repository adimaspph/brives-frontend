import { BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";

export { PrivateRoute };

function PrivateRoute({ component: Component, ...rest }) {
	var auth = "";
	if (localStorage.getItem("user") != null) {
		auth = JSON.parse(localStorage.getItem("user")).login;
	}

	return (
		<Route
			{...rest}
			render={(props) => {
				if (!auth) {
					// not logged in so redirect to login page with the return url

					if (window.location === "/register") {
						return <Redirect to="/register" />;
					}
					return <Redirect to="/login" />;
				}

				// authorized so return component
				return <Component {...props} />;
			}}
		/>
	);
}
