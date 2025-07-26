import { Delete } from "@mui/icons-material";
import { Avatar, Box, Grid, IconButton, Rating } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";

const ReviewCard = () => {
  return (
    <div className="flex justify-between">
      <Grid container spacing={9}>
        <Grid size={{ xs: 1 }}>
          <Box>
            <Avatar
              className="text-white"
              sx={{
                width: 56,
                height: 56,
                backgroundColor: "#9155FD",
              }}
            >
              B
            </Avatar>
          </Box>
        </Grid>

        <Grid size={{ xs: 9 }}>
          <div className="space-y-2">
            <div>
              <p className="font-semibold text-lg">Bernz</p>
              <p className="opacity-70">Date here Date here</p>
            </div>
          </div>

          {/* Rating */}
          <Rating readOnly value={4.5} precision={0.5} />
          <p>value for money product, great product</p>
          <div>
            <img
              className="w-24 h-24 object-cover"
              src="https://dynamic.zacdn.com/tcGl3DY3nPGa69zCg5jm5dBkPnI=/filters:quality(70):format(webp)/https://static-ph.zacdn.com/p/quirkyt-7068-7307303-1.jpg"
              alt=""
            />
          </div>
        </Grid>
      </Grid>

      {/* Delete */}
      <div>
        <IconButton sx={{ color: red[700] }}>
          <Delete />
        </IconButton>
      </div>
    </div>
  );
};

export default ReviewCard;
