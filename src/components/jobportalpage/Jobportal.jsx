import { useEffect, useState } from "react";
import "./Jobportal.css";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { searchCompanyNameData, showJobs } from "../../features/jobDetails";
import { FilterControls } from "./headers/FilterControls";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

export const Jobportal = () => {
  const primaryButtonStyles = {
    width: "100%",
    height: "47px",
    outline: "none",
    backgroundColor: "var(--green)",
    borderRadius: "10px",
    marginTop: "15px",
  };

  const secondaryButtonStyles = {
    ...primaryButtonStyles,
    backgroundColor: "var(--purple)",
  };

  const dispatch = useDispatch();

  const { jobs, loading, searchCompany } = useSelector((state) => state.app);

  const [search, setSearch] = useState("");

  const [selectedJobRole, setSelectedJobRole] = useState(null);

  const [searchExperience, setSearchExperience] = useState(null);

  const [selectedRemoteLocation, setSelectedRemoteLocation] = useState(null);

  const [basePay, setBasePay] = useState(null);

  const [showFullText, setShowFullText] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  const toggleText = (job) => {
    if (selectedId === job.jdUid) {
      setSelectedId(null);
    } else {
      setSelectedId(job.jdUid);
      setShowFullText(false);
    }
  };

  useEffect(() => {
    dispatch(showJobs());
    dispatch(searchCompanyNameData(search));
  }, [dispatch, search]);


// filtering the job  cards based on the selected options

  const filterdJobs = jobs?.jdList?.filter(
    (job) =>
      (selectedJobRole
        ? job.jobRole.toLowerCase() === selectedJobRole.toLowerCase()
        : true) &&
      (searchExperience ? job.minExp >= searchExperience : true) &&
      (selectedRemoteLocation
        ? job.location.toLowerCase() === selectedRemoteLocation.toLowerCase()
        : true) &&
      (basePay
        ? job.salaryCurrencyCode.toLowerCase() ===
            basePay.split(" ")[1].toLowerCase() &&
          job.minJdSalary >= parseInt(basePay.split(" ")[0])
        : true) &&
      job?.companyName.toLowerCase().includes(searchCompany.toLowerCase())
  );

  return (
    <div className="job__portal__container">
      <div className="filter__actions">
        <FilterControls
          setSearch={setSearch}
          setSelectedJobRole={setSelectedJobRole}
          setSearchExperience={setSearchExperience}
          setSelectedRemoteLocation={setSelectedRemoteLocation}
          setBasePay={setBasePay}
        />
      </div>
      <div className="job__cards__section">
        <>
          {filterdJobs && !loading ? (
            filterdJobs.map((job) => (
              <div key={job.jdUid} className="card">
                <div className="date__of__posting">Posted 10 days ago</div>
                <div className="company__name">
                  <div className="company__img">
                    <img src={job.logoUrl} alt="Company Logo" />
                  </div>
                  <div className="role">
                    <div className="title">{job.companyName}</div>
                    <div className="text">{job.jobRole}</div>
                    <div className="text">{job.location}</div>
                  </div>
                </div>

                <div className="estimated__salary">
                  Estimated Salary: {job.salaryCurrencyCode} {job.minJdSalary} -{" "}
                  {job.maxJdSalary} {job.salaryCurrencyCode} LPA ✅
                </div>
                <div className="company__info">
                  <div className="title">About Company</div>
                  <div className="about__us">About us</div>
                  <div className="text">
                    {((showFullText || selectedId === job.jdUid) &&
                      job.jobDetailsFromCompany) ||
                      `${job.jobDetailsFromCompany.slice(0, 200)}...`}
                  </div>
                  <div className="links" onClick={() => toggleText(job)}>
                    {selectedId === job.jdUid ? "View less" : "View job"}
                  </div>
                </div>

                <div className="experience__section">
                  <div className="text">Minimum Experience</div>
                  <div className="experience">
                    {job.minExp !== null ? job.minExp : 0} years
                  </div>
                </div>

                <Link
                  href={job.jdLink}
                  variant="body2"
                  style={{ fontSize: "20px" }}
                >
                  ⚡ Easy Apply
                </Link>

                <Button variant="contained" style={secondaryButtonStyles}>
                  Unlock referral asks
                </Button>
              </div>
            ))
          ) : (
            <>
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            </>
          )}

          {filterdJobs?.length === 0 && <h1>No data found</h1>}
        </>
      </div>
    </div>
  );
};
