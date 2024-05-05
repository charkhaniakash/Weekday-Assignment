import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useSelector } from "react-redux";


// getting props from parent component
export const FilterControls = ({
  setSearch,
  setSelectedJobRole,
  setSearchExperience,
  setSelectedRemoteLocation,
  setBasePay,
}) => {

  //  getting data from globally 
  const { jobs } = useSelector((state) => state.app);


  // rendering the options inside the dropdown  
  const roles = jobs?.jdList?.map((job) => job.jobRole);
  const experience =
    jobs?.jdList?.map((job) => (job.minExp !== null ? job.minExp : 0)) || [];
  const remote = jobs?.jdList?.map((job) => job.location);
  const minimumSalary =
    jobs?.jdList?.map(
      (job) =>
        `${job.minJdSalary !== null ? job.minJdSalary : 0} ${
          job.salaryCurrencyCode
        }`
    ) || [];

  return (
    <>
      <Autocomplete
        disablePortal
        options={roles}
        sx={{ width: 170, height: 40, marginTop: "20px" }}
        renderInput={(params) => <TextField {...params} label="Roles" />}
        onChange={(event, value) => setSelectedJobRole(value)}
      />
      <Autocomplete
        disablePortal
        options={experience}
        sx={{ width: 200, height: 40, marginTop: "20px" }}
        renderInput={(params) => (
          <TextField {...params} label="Experience(Years)" />
        )}
        onChange={(event, value) => setSearchExperience(value)}
      />
      <Autocomplete
        disablePortal
        options={remote}
        sx={{ width: 140, height: 40, marginTop: "20px" }}
        renderInput={(params) => <TextField {...params} label="Remote" />}
        onChange={(event, value) => setSelectedRemoteLocation(value)}
      />

      <Autocomplete
        disablePortal
        options={minimumSalary}
        sx={{ width: 240, height: 40, marginTop: "20px" }}
        renderInput={(params) => (
          <TextField {...params} label="Minimum Base Pay Salary" />
        )}
        onChange={(event, value) => setBasePay(value)}
      />
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Multiline"
          multiline
          maxRows={4}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </>
  );
};
