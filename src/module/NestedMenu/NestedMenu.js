import "./NestedMenu.scss";
import React, { useState } from "react";
import { Menu, MenuItem, Typography } from "@material-ui/core";
import NestedMenuItem from "material-ui-nested-menu-item";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { songAddRemove } from "../../Redux/GeneralSlice";

function NestedMenu(props) {
  const [menuPosition, setMenuPosition] = useState(null);
  const playlist = useSelector((state) => state.global?.playlist);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleRightClick = (event) => {
    event.preventDefault();
    setMenuPosition({
      top: event.pageY,
      left: event.pageX,
    });
  };

  const handleItemClick = (event) => {
    setMenuPosition(null);
  };
  return (
    <div onContextMenu={handleRightClick} className="d-inline">
      {/* <Typography>Right click to open menu</Typography> */}
      <i class="fas fa-ellipsis-h" />
      <Menu
        open={!!menuPosition}
        onClose={() => setMenuPosition(null)}
        anchorReference="anchorPosition"
        anchorPosition={menuPosition}
      >
        <MenuItem onClick={handleItemClick}>Go to song</MenuItem>

        <NestedMenuItem
          label="Add to playlist"
          parentMenuOpen={!!menuPosition}
          onClick={handleItemClick}
        >
          <MenuItem onClick={() => history.push("/library")}>
            Create New
          </MenuItem>
          <hr />
          {playlist?.length > 0 &&
            playlist?.map((x) => (
              <MenuItem
                key={x?.id}
                onClick={() => {
                  dispatch(
                    songAddRemove({ playlist_id: x?.id, song: props?.songData })
                  );
                  setMenuPosition(null);
                }}
              >
                {x?.songs?.findIndex(
                  (eachSong) => eachSong?.id === props?.songData?.id
                ) !== -1 && "✔️"}
                {x?.name}
              </MenuItem>
            ))}
        </NestedMenuItem>
      </Menu>
    </div>
  );
}

export default NestedMenu;
