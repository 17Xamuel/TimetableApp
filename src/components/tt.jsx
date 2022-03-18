import React from "react";

export default ({ tt }) => {
  if (tt.length === 0) {
    return (
      <div className="tt-content-ctr tt-content-border">
        No TimeTable Generated
      </div>
    );
  } else {
    return (
      <div className="tt-content-ctr">
        <div className="tt-hdr">
          <div className="tt-hdr-row">
            <div></div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thur</div>
            <div>Fri</div>
            <div>Sat</div>
            <div>Sun</div>
          </div>
        </div>
        <div className="tt-body">
          <div className="tt-body-row">
            <div>8:00am to 9:00am</div>
            {[1, 2, 3, 4, 5].map((v, i) => {
              return (
                <div key={i}>
                  {tt[i][0].length === 0
                    ? ""
                    : tt[i][0].map((el, i) => (
                        <div key={i}>{el.course_unit_name}</div>
                      ))}
                </div>
              );
            })}
            <div></div>
            <div></div>
          </div>
          <div className="tt-body-row">
            <div>9:00am to 10:00am</div>
            {[1, 2, 3, 4, 5].map((v, i) => {
              return (
                <div key={i}>
                  {tt[i][1].length === 0
                    ? ""
                    : tt[i][1].map((el, i) => (
                        <div key={i}>{el.course_unit_name}</div>
                      ))}
                </div>
              );
            })}
            <div></div>
            <div></div>
          </div>
          <div className="tt-body-row">
            <div>10:00am to 11:00am</div>
            {[1, 2, 3, 4, 5].map((v, i) => {
              return (
                <div key={i}>
                  {tt[i][2].length === 0
                    ? ""
                    : tt[i][2].map((el, i) => (
                        <div key={i}>{el.course_unit_name}</div>
                      ))}
                </div>
              );
            })}
            <div></div>
            <div></div>
          </div>
          <div className="tt-body-row">
            <div>11:00am to 12:00noon</div>
            {[1, 2, 3, 4, 5].map((v, i) => {
              return (
                <div key={i}>
                  {tt[i][3].length === 0
                    ? ""
                    : tt[i][3].map((el, i) => (
                        <div key={i}>{el.course_unit_name}</div>
                      ))}
                </div>
              );
            })}
            <div></div>
            <div></div>
          </div>
          <div className="tt-body-row">
            <div>12:00noon to 1:00pm</div>
            {[1, 2, 3, 4, 5].map((v, i) => {
              return (
                <div key={i}>
                  {tt[i][4].length === 0
                    ? ""
                    : tt[i][4].map((el, i) => (
                        <div key={i}>{el.course_unit_name}</div>
                      ))}
                </div>
              );
            })}
            <div></div>
            <div></div>
          </div>
          <div className="tt-body-row">
            <div>1:00pm to 2:00pm</div>
            {[1, 2, 3, 4, 5].map((v, i) => {
              return (
                <div key={i}>
                  {tt[i][5].length === 0
                    ? ""
                    : tt[i][5].map((el, i) => (
                        <div key={i}>{el.course_unit_name}</div>
                      ))}
                </div>
              );
            })}
            <div></div>
            <div></div>
          </div>
          <div className="tt-body-row">
            <div>2:00pm to 3:00pm</div>
            {[1, 2, 3, 4, 5].map((v, i) => {
              return (
                <div key={i}>
                  {tt[i][6].length === 0
                    ? ""
                    : tt[i][6].map((el, i) => (
                        <div key={i}>{el.course_unit_name}</div>
                      ))}
                </div>
              );
            })}
            <div></div>
            <div></div>
          </div>
          <div className="tt-body-row">
            <div>3:00pm to 4:00pm</div>
            {[1, 2, 3, 4, 5].map((v, i) => {
              return (
                <div key={i}>
                  {tt[i][7].length === 0
                    ? ""
                    : tt[i][7].map((el, i) => (
                        <div key={i}>{el.course_unit_name}</div>
                      ))}
                </div>
              );
            })}
            <div></div>
            <div></div>
          </div>
          <div className="tt-body-row">
            <div>4:00pm to 5:00pm</div>
            {[1, 2, 3, 4, 5].map((v, i) => {
              return (
                <div key={i}>
                  {tt[i][8].length === 0
                    ? ""
                    : tt[i][8].map((el, i) => (
                        <div key={i}>{el.course_unit_name}</div>
                      ))}
                </div>
              );
            })}
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
};
