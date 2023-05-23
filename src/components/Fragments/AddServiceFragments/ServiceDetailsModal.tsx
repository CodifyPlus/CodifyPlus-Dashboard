import {
    Button,
  } from "@mantine/core";
  import React from "react";
  import { Link } from "react-router-dom";
  
  interface newServiceIdProps {
    data: {
      _id: string
    };
  }
  
  function ServiceDetalsModal({ data }: newServiceIdProps) {
    return (
      <>
        
          <Button
            component={Link}
            m={5}
            ml={0}
            to={`/dashboard/addservice/`}
            variant="outline"
            color="yellow"
            onClick={() => window.location.reload()}
          >
            Add Another Service
          </Button>
          <Button
            component={Link}
            m={5}
            ml={0}
            to={`/dashboard/track/${data._id}`}
            variant="outline"
            color="yellow"
          >
            Add Tracking Info
          </Button>
      </>
    );
  }
  
  export default ServiceDetalsModal;
  