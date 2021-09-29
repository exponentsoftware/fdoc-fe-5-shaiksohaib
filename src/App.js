import { useEffect } from "react";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./module/Header/Header";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AddAlbums from "./Pages/AddAlbums/AddAlbums";
import Library from "./Pages/Library/Library";
import AlbumsDetails from "./Pages/AlbumsDetails/AlbumsDetails";
import PlaylistDetails from "./Pages/PlaylistDetails/PlaylistDetails";
import { useDispatch } from "react-redux";
import { fakedataPopulate } from "./Redux/GeneralSlice";
import { fakeData } from "./assets/fakeData";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fakedataPopulate(fakeData));
  }, [dispatch]);
  return (
    <>
      <Router>
        <div className="App bg-black">
          <Header />
          <div className="d-flex flex-column min-vh-100">
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/add-album" component={AddAlbums} />
            <Route exact path="/albums" component={AlbumsDetails} />
            <Route exact path="/library" component={Library} />
            <Route exact path="/playlist-details" component={PlaylistDetails} />
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
