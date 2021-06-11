import { Container } from "react-bootstrap";
const AUTH =
  "https://accounts.spotify.com/authorize?client_id=43bd539785024e6ea2db929033117b78&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";
function Login() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center "
      style={{ height: "100vh" }}
    >
      <a className="btn btn-success btn-lg" href={AUTH}>
        Login with spotify
      </a>
    </Container>
  );
}
export default Login;
