import Albums from "../../module/Albums/Albums";
import SingleCard from "../../module/SingleCard/SingleCard";
import "./Dashboard.scss";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Dashboard() {
  const AlbumData = useSelector((state) => state.global?.AlbumData);
  const searchString = useSelector((state) => state.global?.searchString);
  const [allAlbumData, setAllAlbumData] = useState([]);
  useEffect(() => {
    if (searchString) {
      let data = setAllAlbumData(
        AlbumData.filter(
          (x) =>
            x.album_title.includes(searchString.trim()) ||
            x.artist.includes(searchString.trim())
        )
      );
    } else {
      setAllAlbumData(AlbumData);
    }
  }, [AlbumData, searchString]);
  return (
    <div className="dashboard pt-3">
      <SingleCard data={AlbumData[0]} isDeletable="false" />
      <Albums data={allAlbumData} title="All Albums" />
      <Albums data={AlbumData} title="Top peeks" />
    </div>
  );
}

export default Dashboard;
