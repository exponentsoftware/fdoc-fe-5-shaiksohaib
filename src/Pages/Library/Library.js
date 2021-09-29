import "./Library.scss";
import SinglePlayList from "../../module/SinglePlayList/SinglePlayList";
import { useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { createPlaylist } from "../../Redux/GeneralSlice";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function Library() {
  const dispatch = useDispatch();

  const playlist = useSelector((state) => state.global.playlist);
  const [isCreating, setIsCreating] = useState(false);
  const [data, setdata] = useState({
    name: "",
    user: "",
    cover: null,
  });
  const handleFieldChange = (e) => {
    const temp = { ...data };
    if (e.target.type === "file") {
      temp[e.target.name] = e.target.files[0];
    } else temp[e.target.name] = e.target.value;
    setdata(temp);
  };
  const handlePlaylistCreation = () => {
    let formData = { ...data, songs: [], id: uuidv4() };
    console.log("formdata", formData);
    dispatch(createPlaylist(formData));
    setdata({
      name: "",
      user: "",
      cover: null,
    });
    setIsCreating(false);
  };
  return (
    <div className="d-flex">
      <div
        className="bg-primary create_op text-center"
        onClick={() => setIsCreating(true)}
      >
        Create a playlist
      </div>
      <div className="d-flex">
        {playlist?.map((x) => (
          <div>
            <SinglePlayList data={x} />
          </div>
        ))}
      </div>
      <Modal
        open={isCreating}
        onClose={() => setIsCreating(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="">
            <div className="d-flex flex-column align-items-center justify-content-around">
              <div className="col-md-6 col-12 d-flex justify-contents-center">
                <label className="fileUpload">
                  <input
                    type="file"
                    id="image"
                    name="cover"
                    hidden
                    accept="image/*"
                    multiple={false}
                    onChange={handleFieldChange}
                    style={{
                      display: "none",
                    }}
                  />
                  <div>
                    <img
                      src={
                        data?.cover
                          ? URL?.createObjectURL(data?.cover)
                          : "/noAlbumCover.png"
                      }
                      alt=""
                      style={{
                        maxWidth: "100%",
                        maxHeight: "200px",
                      }}
                    />
                  </div>
                  <br />
                  <div className="image__bottom">
                    {true === null ? (
                      <span className="image_upload_text">
                        Upload Album Cover
                      </span>
                    ) : (
                      <span className="image_upload_text">
                        Change Album Cover
                      </span>
                    )}
                  </div>
                </label>
              </div>
              <div className="my-3">
                <input
                  type="text"
                  className="form__field"
                  name="name"
                  placeholder="Enter Playlist name"
                  value={data?.name}
                  onChange={handleFieldChange}
                />
              </div>
              <div className="my-3">
                <input
                  type="text"
                  className="form__field"
                  name="user"
                  placeholder="Enter Playlist User name"
                  value={data?.user}
                  onChange={handleFieldChange}
                />
              </div>
            </div>
            <div className="col-auto ">
              <button
                className="btn btn-primary rounded-pill fs-14 fw-7 ff-roboto bgBTN d-inline-flex py-2 px-4 overflow-hidden border-0"
                onClick={handlePlaylistCreation}
              >
                <span className="px-0 py-1 text-white">Add certification</span>
              </button>
              <button
                className="btn shadow-none rounded-pill fs-14 fw-6 NobgBtn "
                onClick={() => setIsCreating(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Library;
