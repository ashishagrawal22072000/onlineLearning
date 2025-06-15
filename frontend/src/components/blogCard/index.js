import React from "react";
import moment from "moment";

const BlogCard = ({
  image,
  title,
  author,
  createdAt,
  description,
  onReadMore,
  category,
}) => {
  return (
    <div
      className="card mb-4 border-0"
      style={{ height: "450px" }}
      onClick={onReadMore}
    >
      <img
        src={image}
        className="card-img-top"
        alt={title}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div
        className="card-body"
        style={{ height: "250px", overflow: "hidden" }}
      >
        <h5 className="card-title">{title}</h5>
        <p className="text-muted mb-1">
          <strong>Author:</strong> {author}
        </p>
        <p className="text-muted mb-1">
          <strong>Category:</strong> {category}
        </p>
        <p className="text-muted">
          <strong>Posted:</strong> {moment(createdAt).format("MMM Do YYYY")}
        </p>
        <p
          className="card-text"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {
            <div
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            ></div>
          }
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
