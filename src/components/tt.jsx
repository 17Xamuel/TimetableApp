import React from "react";

export default ({ tt }) => {
  if (typeof tt === "string") {
    return <div className="tt-content-ctr tt-content-border">{tt}</div>;
  }
  return (
    <div className="tt-content-ctr">
      <div className="tt-hdr">
        <div className="tt-hdr-row">
          <div></div>
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thur</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
      </div>
      <div className="tt-body">
        <div className="tt-body-row">
          <div>7:00am to 8:00am</div>
          <div>{tt[0][0][0].course_unit_name}</div>
          <div>{tt[0][0][0].course_unit_name}</div>
          <div>{tt[0][0][0].course_unit_name}</div>
          <div>{tt[0][0][0].course_unit_name}</div>
          <div>{tt[0][0][0].course_unit_name}</div>
          <div>{tt[0][0][0].course_unit_name}</div>
        </div>
        <div className="tt-body-row">
          <div>7:00am to 8:00am</div>
          <div>LCS3201</div>
          <div>LCS302</div>
          <div>LCS3203</div>
          <div>LCS3204</div>
          <div>LCS3204</div>
          <div>LCS3204</div>
          <div>LCS3204</div>
        </div>
        <div className="tt-body-row">
          <div>7:00am to 8:00am</div>
          <div>LCS3201</div>
          <div>LCS302</div>
          <div>LCS3203</div>
          <div>LCS3204</div>
          <div>LCS3204</div>
          <div>LCS3204</div>
          <div>LCS3204</div>
        </div>
        <div className="tt-body-row">
          <div>7:00am to 8:00am</div>
          <div>LCS3201</div>
          <div>LCS302</div>
          <div>LCS3203</div>
          <div>LCS3204</div>
          <div>LCS3204</div>
          <div>LCS3204</div>
          <div>LCS3204</div>
        </div>
        <div className="tt-body-row">
          <div>7:00am to 8:00am</div>
          <div>LCS3201</div>
          <div>LCS302</div>
          <div>LCS3203</div>
          <div>LCS3204</div>
          <div>LCS3204</div>
          <div>LCS3204</div>
          <div>LCS3204</div>
        </div>
        <div className="tt-body-row">
          <div>7:00am to 8:00am</div>
          <div>LCS3201</div>
          <div>LCS302</div>
          <div>LCS3203</div>
          <div>LCS3204</div>
          <div>LCS3204</div>
          <div>LCS3204</div>
          <div>LCS3204</div>
        </div>
      </div>
    </div>
  );
};
