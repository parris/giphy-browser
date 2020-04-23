import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container } from '@material-ui/core';

function ViewGiphyImage() {
  let { id } = useParams();

  return (
    <Container>
      <div>
        <Link to="/">
          { '< Back' }
        </Link>
      </div>
      <img src={atob(id ?? '')} alt="" />
    </Container>
  );
}

export default ViewGiphyImage;
