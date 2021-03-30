import React from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { Card } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

import config from "../../config";

function PostListItem({ post, onDelete }) {
  const history = useHistory();
  const goToPage = (pathname) => history.push(pathname);

  const postLink = () => `${config.POST_DETAIL_PAGE}${post.cuid}/${post.slug}`;

  return (
    <Card className="w-100 my-4 post-card">
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          <Link to={postLink()} onClick={() => goToPage(postLink())}>
            {post.title}
          </Link>
        </Typography>
        <Typography component="p" className="mt-3 post-preview-content">
          {post.content}
        </Typography>
        <Typography
          color="textSecondary"
          component="p"
          className="mt-3 font-italic"
        >
          From {post.name}
        </Typography>
      </CardContent>
      {post.image && (
        <div
          style={{ padding: "20px", display: "flex", justifyContent: "center" }}
        >
          <img src={post.image} width="250" height="200" />
        </div>
      )}
      {post.isDelectable && (
        <CardActions>
          <Button size="small" color="secondary" onClick={onDelete}>
            Delete post
          </Button>
        </CardActions>
      )}
    </Card>
  );
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostListItem;
