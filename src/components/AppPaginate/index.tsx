import { Box, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import limitItemsService from "../services/limitItemsService";
import { Iprofile } from "../../types";

interface IPagination {
  count: number;
  from: number;
  to: number;
}

interface AppPaginationProps {
  filteredProfiles: Iprofile[];
  setProducts: (data: Iprofile[]) => void;
}

const elelemPerPage: number = 5;

const AppPaginate: React.FC<AppPaginationProps> = ({filteredProfiles, setProducts}) => {

  const [pagination, setPagination] = useState<IPagination>({
    count: 0,
    from: 0,
    to: elelemPerPage
  })
  
  useEffect(() => {
    limitItemsService.getData(pagination.from, pagination.to, filteredProfiles)
      .then(responce => {
        setPagination({...pagination, count: responce.count})
        setProducts(responce.data)
      })
  },[pagination.from, pagination.to, filteredProfiles.length]);

  const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    const from = (page - 1) * elelemPerPage;
    const to = (page - 1) * elelemPerPage + elelemPerPage;

    setPagination({...pagination, from: from, to: to})
  }
  return (
    <Box className={`flex justify-center items-center mt-6 ${filteredProfiles.length < 5 ? 'hidden' : null}`}>
      <Pagination
        count={Math.ceil(pagination.count / elelemPerPage)}
        onChange={handleChangePage}
        variant="outlined" color="primary"
      />
    </Box>
  )
}

export default AppPaginate;