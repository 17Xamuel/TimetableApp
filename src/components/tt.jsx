import React from "react";

export default ({
  tt,
  user,
  rooms,
  teachers,
  filter_level,
  filter_class,
  teacher_pin,
}) => {
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
            {/* <div>Sat</div>
            <div>Sun</div> */}
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
                    : tt[i][0].map((el, index) => {
                        if (filter_level === "Dept") {
                          if (user.id === el.course_unit_dept) {
                            let room = rooms.find(
                              (room) => (room.id = el.course_unit_room)
                            );
                            let codes = JSON.parse(el.course_unit_codes);
                            let teacher =
                              teachers.find(
                                (teacher) =>
                                  teacher.id === el.course_unit_teacher
                              ) || {};
                            let codes_str = "";
                            codes.forEach((code) => {
                              codes_str += `${code} `;
                            });
                            return (
                              <div key={index}>
                                <span style={{ color: "12fd31" }}>
                                  {codes_str}
                                </span>
                                <span style={{ color: "1231fd" }}>
                                  {teacher.teacher_name}
                                </span>
                                <span style={{ color: "fd1231" }}>
                                  {room.room_name}
                                </span>
                              </div>
                            );
                          } else {
                            return <div key={index}></div>;
                          }
                        } else if (filter_level === "Teacher") {
                          if (teacher_pin !== 0) {
                            let room = rooms.find(
                              (room) => (room.id = el.course_unit_room)
                            );
                            let codes = JSON.parse(el.course_unit_codes);
                            let teacher =
                              teachers.find(
                                (teacher) =>
                                  teacher.id === el.course_unit_teacher
                              ) || {};
                            let codes_str = "";
                            codes.forEach((code) => {
                              codes_str += `${code} `;
                            });
                            if (teacher.teacher_pin === teacher_pin) {
                              return (
                                <div key={index}>
                                  <div>
                                    <div style={{ color: "#12fd31" }}>
                                      {codes_str}
                                    </div>
                                    <div style={{ color: "#1231fd" }}>
                                      {teacher.teacher_name}
                                    </div>
                                    <span style={{ color: "#fd1231" }}>
                                      {room.room_name}
                                    </span>
                                  </div>
                                </div>
                              );
                            } else {
                              return <div key={index}></div>;
                            }
                          } else {
                            return <div key={index}></div>;
                          }
                        } else if (filter_level === "Admin") {
                          let room = rooms.find(
                            (room) => (room.id = el.course_unit_room)
                          );
                          let codes = JSON.parse(el.course_unit_codes);
                          let teacher =
                            teachers.find(
                              (teacher) => teacher.id === el.course_unit_teacher
                            ) || {};
                          let codes_str = "";
                          codes.forEach((code) => {
                            codes_str += `${code} `;
                          });
                          if (user.role === "Admin") {
                            return (
                              <div key={index}>
                                <div> {el.course_unit_name}</div> <br />
                              </div>
                            );
                          } else {
                            return (
                              <div key={index}>
                                <div
                                  style={
                                    user.id === el.course_unit_dept
                                      ? { fontWeight: "bold" }
                                      : { opacity: "0.45" }
                                  }
                                >
                                  <div style={{ color: "#12fd31" }}>
                                    {codes_str}
                                  </div>
                                  <div style={{ color: "#1231fd" }}>
                                    {teacher.teacher_name}
                                  </div>
                                  <span style={{ color: "#fd1231" }}>
                                    {room.room_name}
                                  </span>
                                </div>
                              </div>
                            );
                          }
                        } else if (filter_level === "class") {
                          let class_course_units = JSON.parse(
                            filter_class.class_course_units
                          );
                          if (
                            class_course_units.find(
                              (class_course_unit) =>
                                class_course_unit.id === el.id
                            )
                          ) {
                            let room = rooms.find(
                              (room) => (room.id = el.course_unit_room)
                            );
                            let codes = JSON.parse(el.course_unit_codes);
                            let teacher =
                              teachers.find(
                                (teacher) =>
                                  teacher.id === el.course_unit_teacher
                              ) || {};
                            let codes_str = "";
                            codes.forEach((code) => {
                              codes_str += `${code} `;
                            });

                            return (
                              <div key={index}>
                                <div>
                                  <div style={{ color: "#12fd31" }}>
                                    {codes_str}
                                  </div>
                                  <div style={{ color: "#1231fd" }}>
                                    {teacher.teacher_name}
                                  </div>
                                  <span style={{ color: "#fd1231" }}>
                                    {room.room_name}
                                  </span>
                                </div>
                              </div>
                            );
                          } else {
                            return <div key={index}></div>;
                          }
                        } else {
                          return <div key={index}></div>;
                        }
                      })}
                </div>
              );
            })}
            {/* <div></div>
            <div></div> */}
          </div>
          <div className="tt-body-row">
            <div>9:00am to 10:00am</div>
            {[1, 2, 3, 4, 5].map((v, i) => {
              return (
                <div key={i}>
                  {tt[i][1].length === 0
                    ? ""
                    : tt[i][1].map((el, index) => {
                        if (filter_level === "Dept") {
                          if (user.id === el.course_unit_dept) {
                            let room = rooms.find(
                              (room) => (room.id = el.course_unit_room)
                            );
                            let codes = JSON.parse(el.course_unit_codes);
                            let teacher =
                              teachers.find(
                                (teacher) =>
                                  teacher.id === el.course_unit_teacher
                              ) || {};
                            let codes_str = "";
                            codes.forEach((code) => {
                              codes_str += `${code} `;
                            });
                            return (
                              <div key={index}>
                                <span style={{ color: "12fd31" }}>
                                  {codes_str}
                                </span>
                                <span style={{ color: "1231fd" }}>
                                  {teacher.teacher_name}
                                </span>
                                <span style={{ color: "fd1231" }}>
                                  {room.room_name}
                                </span>
                              </div>
                            );
                          } else {
                            return <div key={index}></div>;
                          }
                        } else if (filter_level === "Teacher") {
                          if (teacher_pin !== 0) {
                            let room = rooms.find(
                              (room) => (room.id = el.course_unit_room)
                            );
                            let codes = JSON.parse(el.course_unit_codes);
                            let teacher =
                              teachers.find(
                                (teacher) =>
                                  teacher.id === el.course_unit_teacher
                              ) || {};
                            let codes_str = "";
                            codes.forEach((code) => {
                              codes_str += `${code} `;
                            });
                            if (teacher.teacher_pin === teacher_pin) {
                              return (
                                <div key={index}>
                                  <div>
                                    <div style={{ color: "#12fd31" }}>
                                      {codes_str}
                                    </div>
                                    <div style={{ color: "#1231fd" }}>
                                      {teacher.teacher_name}
                                    </div>
                                    <span style={{ color: "#fd1231" }}>
                                      {room.room_name}
                                    </span>
                                  </div>
                                </div>
                              );
                            } else {
                              return <div key={index}></div>;
                            }
                          } else {
                            return <div key={index}></div>;
                          }
                        } else if (filter_level === "Admin") {
                          let room = rooms.find(
                            (room) => (room.id = el.course_unit_room)
                          );
                          let codes = JSON.parse(el.course_unit_codes);
                          let teacher =
                            teachers.find(
                              (teacher) => teacher.id === el.course_unit_teacher
                            ) || {};
                          let codes_str = "";
                          codes.forEach((code) => {
                            codes_str += `${code} `;
                          });
                          if (user.role === "Admin") {
                            return (
                              <div key={index}>
                                <div> {el.course_unit_name}</div> <br />
                              </div>
                            );
                          } else {
                            return (
                              <div key={index}>
                                <div
                                  style={
                                    user.id === el.course_unit_dept
                                      ? { fontWeight: "bold" }
                                      : { opacity: "0.45" }
                                  }
                                >
                                  <div style={{ color: "#12fd31" }}>
                                    {codes_str}
                                  </div>
                                  <div style={{ color: "#1231fd" }}>
                                    {teacher.teacher_name}
                                  </div>
                                  <span style={{ color: "#fd1231" }}>
                                    {room.room_name}
                                  </span>
                                </div>
                              </div>
                            );
                          }
                        } else if (filter_level === "class") {
                          let class_course_units = JSON.parse(
                            filter_class.class_course_units
                          );
                          if (
                            class_course_units.find(
                              (class_course_unit) =>
                                class_course_unit.id === el.id
                            )
                          ) {
                            let room = rooms.find(
                              (room) => (room.id = el.course_unit_room)
                            );
                            let codes = JSON.parse(el.course_unit_codes);
                            let teacher =
                              teachers.find(
                                (teacher) =>
                                  teacher.id === el.course_unit_teacher
                              ) || {};
                            let codes_str = "";
                            codes.forEach((code) => {
                              codes_str += `${code} `;
                            });

                            return (
                              <div key={index}>
                                <div>
                                  <div style={{ color: "#12fd31" }}>
                                    {codes_str}
                                  </div>
                                  <div style={{ color: "#1231fd" }}>
                                    {teacher.teacher_name}
                                  </div>
                                  <span style={{ color: "#fd1231" }}>
                                    {room.room_name}
                                  </span>
                                </div>
                              </div>
                            );
                          } else {
                            return <div key={index}></div>;
                          }
                        } else {
                          return <div key={index}></div>;
                        }
                      })}
                </div>
              );
            })}
            {/* <div></div>
            <div></div> */}
          </div>
          <div className="tt-body-row">
            <div>10:00am to 11:00am</div>
            {[1, 2, 3, 4, 5].map((v, i) => {
              return (
                <div key={i}>
                  {tt[i][2].length === 0
                    ? ""
                    : tt[i][2].map((el, index) => {
                        if (filter_level === "Dept") {
                          if (user.id === el.course_unit_dept) {
                            let room = rooms.find(
                              (room) => (room.id = el.course_unit_room)
                            );
                            let codes = JSON.parse(el.course_unit_codes);
                            let teacher =
                              teachers.find(
                                (teacher) =>
                                  teacher.id === el.course_unit_teacher
                              ) || {};
                            let codes_str = "";
                            codes.forEach((code) => {
                              codes_str += `${code} `;
                            });
                            return (
                              <div key={index}>
                                <span style={{ color: "12fd31" }}>
                                  {codes_str}
                                </span>
                                <span style={{ color: "1231fd" }}>
                                  {teacher.teacher_name}
                                </span>
                                <span style={{ color: "fd1231" }}>
                                  {room.room_name}
                                </span>
                              </div>
                            );
                          } else {
                            return <div key={index}></div>;
                          }
                        } else if (filter_level === "Teacher") {
                          if (teacher_pin !== 0) {
                            let room = rooms.find(
                              (room) => (room.id = el.course_unit_room)
                            );
                            let codes = JSON.parse(el.course_unit_codes);
                            let teacher =
                              teachers.find(
                                (teacher) =>
                                  teacher.id === el.course_unit_teacher
                              ) || {};
                            let codes_str = "";
                            codes.forEach((code) => {
                              codes_str += `${code} `;
                            });
                            if (teacher.teacher_pin === teacher_pin) {
                              return (
                                <div key={index}>
                                  <div>
                                    <div style={{ color: "#12fd31" }}>
                                      {codes_str}
                                    </div>
                                    <div style={{ color: "#1231fd" }}>
                                      {teacher.teacher_name}
                                    </div>
                                    <span style={{ color: "#fd1231" }}>
                                      {room.room_name}
                                    </span>
                                  </div>
                                </div>
                              );
                            } else {
                              return <div key={index}></div>;
                            }
                          } else {
                            return <div key={index}></div>;
                          }
                        } else if (filter_level === "Admin") {
                          let room = rooms.find(
                            (room) => (room.id = el.course_unit_room)
                          );
                          let codes = JSON.parse(el.course_unit_codes);
                          let teacher =
                            teachers.find(
                              (teacher) => teacher.id === el.course_unit_teacher
                            ) || {};
                          let codes_str = "";
                          codes.forEach((code) => {
                            codes_str += `${code} `;
                          });
                          if (user.role === "Admin") {
                            return (
                              <div key={index}>
                                <div> {el.course_unit_name}</div> <br />
                              </div>
                            );
                          } else {
                            return (
                              <div key={index}>
                                <div
                                  style={
                                    user.id === el.course_unit_dept
                                      ? { fontWeight: "bold" }
                                      : { opacity: "0.45" }
                                  }
                                >
                                  <div style={{ color: "#12fd31" }}>
                                    {codes_str}
                                  </div>
                                  <div style={{ color: "#1231fd" }}>
                                    {teacher.teacher_name}
                                  </div>
                                  <span style={{ color: "#fd1231" }}>
                                    {room.room_name}
                                  </span>
                                </div>
                              </div>
                            );
                          }
                        } else if (filter_level === "class") {
                          let class_course_units = JSON.parse(
                            filter_class.class_course_units
                          );
                          if (
                            class_course_units.find(
                              (class_course_unit) =>
                                class_course_unit.id === el.id
                            )
                          ) {
                            let room = rooms.find(
                              (room) => (room.id = el.course_unit_room)
                            );
                            let codes = JSON.parse(el.course_unit_codes);
                            let teacher =
                              teachers.find(
                                (teacher) =>
                                  teacher.id === el.course_unit_teacher
                              ) || {};
                            let codes_str = "";
                            codes.forEach((code) => {
                              codes_str += `${code} `;
                            });

                            return (
                              <div key={index}>
                                <div>
                                  <div style={{ color: "#12fd31" }}>
                                    {codes_str}
                                  </div>
                                  <div style={{ color: "#1231fd" }}>
                                    {teacher.teacher_name}
                                  </div>
                                  <span style={{ color: "#fd1231" }}>
                                    {room.room_name}
                                  </span>
                                </div>
                              </div>
                            );
                          } else {
                            return <div key={index}></div>;
                          }
                        } else {
                          return <div key={index}></div>;
                        }
                      })}
                </div>
              );
            })}
            {/* <div></div>
            <div></div> */}
          </div>
          <div className="tt-body-row">
            <div>11:00am to 12:00noon</div>
            {[1, 2, 3, 4, 5].map((v, i) => {
              return (
                <div key={i}>
                  {tt[i][3].length === 0
                    ? ""
                    : tt[i][3].map((el, index) => {
                        if (filter_level === "Dept") {
                          if (user.id === el.course_unit_dept) {
                            let room = rooms.find(
                              (room) => (room.id = el.course_unit_room)
                            );
                            let codes = JSON.parse(el.course_unit_codes);
                            let teacher =
                              teachers.find(
                                (teacher) =>
                                  teacher.id === el.course_unit_teacher
                              ) || {};
                            let codes_str = "";
                            codes.forEach((code) => {
                              codes_str += `${code} `;
                            });
                            return (
                              <div key={index}>
                                <span style={{ color: "12fd31" }}>
                                  {codes_str}
                                </span>
                                <span style={{ color: "1231fd" }}>
                                  {teacher.teacher_name}
                                </span>
                                <span style={{ color: "fd1231" }}>
                                  {room.room_name}
                                </span>
                              </div>
                            );
                          } else {
                            return <div key={index}></div>;
                          }
                        } else if (filter_level === "Teacher") {
                          if (teacher_pin !== 0) {
                            let room = rooms.find(
                              (room) => (room.id = el.course_unit_room)
                            );
                            let codes = JSON.parse(el.course_unit_codes);
                            let teacher =
                              teachers.find(
                                (teacher) =>
                                  teacher.id === el.course_unit_teacher
                              ) || {};
                            let codes_str = "";
                            codes.forEach((code) => {
                              codes_str += `${code} `;
                            });
                            if (teacher.teacher_pin === teacher_pin) {
                              return (
                                <div key={index}>
                                  <div>
                                    <div style={{ color: "#12fd31" }}>
                                      {codes_str}
                                    </div>
                                    <div style={{ color: "#1231fd" }}>
                                      {teacher.teacher_name}
                                    </div>
                                    <span style={{ color: "#fd1231" }}>
                                      {room.room_name}
                                    </span>
                                  </div>
                                </div>
                              );
                            } else {
                              return <div key={index}></div>;
                            }
                          } else {
                            return <div key={index}></div>;
                          }
                        } else if (filter_level === "Admin") {
                          let room = rooms.find(
                            (room) => (room.id = el.course_unit_room)
                          );
                          let codes = JSON.parse(el.course_unit_codes);
                          let teacher =
                            teachers.find(
                              (teacher) => teacher.id === el.course_unit_teacher
                            ) || {};
                          let codes_str = "";
                          codes.forEach((code) => {
                            codes_str += `${code} `;
                          });
                          if (user.role === "Admin") {
                            return (
                              <div key={index}>
                                <div> {el.course_unit_name}</div> <br />
                              </div>
                            );
                          } else {
                            return (
                              <div key={index}>
                                <div
                                  style={
                                    user.id === el.course_unit_dept
                                      ? { fontWeight: "bold" }
                                      : { opacity: "0.45" }
                                  }
                                >
                                  <div style={{ color: "#12fd31" }}>
                                    {codes_str}
                                  </div>
                                  <div style={{ color: "#1231fd" }}>
                                    {teacher.teacher_name}
                                  </div>
                                  <span style={{ color: "#fd1231" }}>
                                    {room.room_name}
                                  </span>
                                </div>
                              </div>
                            );
                          }
                        } else if (filter_level === "class") {
                          let class_course_units = JSON.parse(
                            filter_class.class_course_units
                          );
                          if (
                            class_course_units.find(
                              (class_course_unit) =>
                                class_course_unit.id === el.id
                            )
                          ) {
                            let room = rooms.find(
                              (room) => (room.id = el.course_unit_room)
                            );
                            let codes = JSON.parse(el.course_unit_codes);
                            let teacher =
                              teachers.find(
                                (teacher) =>
                                  teacher.id === el.course_unit_teacher
                              ) || {};
                            let codes_str = "";
                            codes.forEach((code) => {
                              codes_str += `${code} `;
                            });

                            return (
                              <div key={index}>
                                <div>
                                  <div style={{ color: "#12fd31" }}>
                                    {codes_str}
                                  </div>
                                  <div style={{ color: "#1231fd" }}>
                                    {teacher.teacher_name}
                                  </div>
                                  <span style={{ color: "#fd1231" }}>
                                    {room.room_name}
                                  </span>
                                </div>
                              </div>
                            );
                          } else {
                            return <div key={index}></div>;
                          }
                        } else {
                          return <div key={index}></div>;
                        }
                      })}
                </div>
              );
            })}
            {/* <div></div>
            <div></div> */}
          </div>
          <div className="tt-body-row">
            <div>12:00noon to 1:00pm</div>
            {[1, 2, 3, 4, 5].map((v, i) => {
              return (
                <div key={i}>
                  {tt[i][4].length === 0
                    ? ""
                    : tt[i][4].map((el, index) => {
                        if (filter_level === "Dept") {
                          if (user.id === el.course_unit_dept) {
                            let room = rooms.find(
                              (room) => (room.id = el.course_unit_room)
                            );
                            let codes = JSON.parse(el.course_unit_codes);
                            let teacher =
                              teachers.find(
                                (teacher) =>
                                  teacher.id === el.course_unit_teacher
                              ) || {};
                            let codes_str = "";
                            codes.forEach((code) => {
                              codes_str += `${code} `;
                            });
                            return (
                              <div key={index}>
                                <span style={{ color: "12fd31" }}>
                                  {codes_str}
                                </span>
                                <span style={{ color: "1231fd" }}>
                                  {teacher.teacher_name}
                                </span>
                                <span style={{ color: "fd1231" }}>
                                  {room.room_name}
                                </span>
                              </div>
                            );
                          } else {
                            return <div key={index}></div>;
                          }
                        } else if (filter_level === "Teacher") {
                          if (teacher_pin !== 0) {
                            let room = rooms.find(
                              (room) => (room.id = el.course_unit_room)
                            );
                            let codes = JSON.parse(el.course_unit_codes);
                            let teacher =
                              teachers.find(
                                (teacher) =>
                                  teacher.id === el.course_unit_teacher
                              ) || {};
                            let codes_str = "";
                            codes.forEach((code) => {
                              codes_str += `${code} `;
                            });
                            if (teacher.teacher_pin === teacher_pin) {
                              return (
                                <div key={index}>
                                  <div>
                                    <div style={{ color: "#12fd31" }}>
                                      {codes_str}
                                    </div>
                                    <div style={{ color: "#1231fd" }}>
                                      {teacher.teacher_name}
                                    </div>
                                    <span style={{ color: "#fd1231" }}>
                                      {room.room_name}
                                    </span>
                                  </div>
                                </div>
                              );
                            } else {
                              return <div key={index}></div>;
                            }
                          } else {
                            return <div key={index}></div>;
                          }
                        } else if (filter_level === "Admin") {
                          let room = rooms.find(
                            (room) => (room.id = el.course_unit_room)
                          );
                          let codes = JSON.parse(el.course_unit_codes);
                          let teacher =
                            teachers.find(
                              (teacher) => teacher.id === el.course_unit_teacher
                            ) || {};
                          let codes_str = "";
                          codes.forEach((code) => {
                            codes_str += `${code} `;
                          });
                          if (user.role === "Admin") {
                            return (
                              <div key={index}>
                                <div> {el.course_unit_name}</div> <br />
                              </div>
                            );
                          } else {
                            return (
                              <div key={index}>
                                <div
                                  style={
                                    user.id === el.course_unit_dept
                                      ? { fontWeight: "bold" }
                                      : { opacity: "0.45" }
                                  }
                                >
                                  <div style={{ color: "#12fd31" }}>
                                    {codes_str}
                                  </div>
                                  <div style={{ color: "#1231fd" }}>
                                    {teacher.teacher_name}
                                  </div>
                                  <span style={{ color: "#fd1231" }}>
                                    {room.room_name}
                                  </span>
                                </div>
                              </div>
                            );
                          }
                        } else if (filter_level === "class") {
                          let class_course_units = JSON.parse(
                            filter_class.class_course_units
                          );
                          if (
                            class_course_units.find(
                              (class_course_unit) =>
                                class_course_unit.id === el.id
                            )
                          ) {
                            let room = rooms.find(
                              (room) => (room.id = el.course_unit_room)
                            );
                            let codes = JSON.parse(el.course_unit_codes);
                            let teacher =
                              teachers.find(
                                (teacher) =>
                                  teacher.id === el.course_unit_teacher
                              ) || {};
                            let codes_str = "";
                            codes.forEach((code) => {
                              codes_str += `${code} `;
                            });

                            return (
                              <div key={index}>
                                <div>
                                  <div style={{ color: "#12fd31" }}>
                                    {codes_str}
                                  </div>
                                  <div style={{ color: "#1231fd" }}>
                                    {teacher.teacher_name}
                                  </div>
                                  <span style={{ color: "#fd1231" }}>
                                    {room.room_name}
                                  </span>
                                </div>
                              </div>
                            );
                          } else {
                            return <div key={index}></div>;
                          }
                        } else {
                          return <div key={index}></div>;
                        }
                      })}
                </div>
              );
            })}
            {/* <div></div>
            <div></div> */}
          </div>
          <div className="tt-body-row">
            <div>1:00pm to 2:00pm</div>
            {[1, 2, 3, 4, 5].map((v, i) => {
              return (
                <div key={i}>
                  {tt[i][5].length === 0
                    ? ""
                    : tt[i][5].map((el, index) => {
                        if (filter_level === "Dept") {
                          if (user.id === el.course_unit_dept) {
                            let room = rooms.find(
                              (room) => (room.id = el.course_unit_room)
                            );
                            let codes = JSON.parse(el.course_unit_codes);
                            let teacher =
                              teachers.find(
                                (teacher) =>
                                  teacher.id === el.course_unit_teacher
                              ) || {};
                            let codes_str = "";
                            codes.forEach((code) => {
                              codes_str += `${code} `;
                            });
                            return (
                              <div key={index}>
                                <span style={{ color: "12fd31" }}>
                                  {codes_str}
                                </span>
                                <span style={{ color: "1231fd" }}>
                                  {teacher.teacher_name}
                                </span>
                                <span style={{ color: "fd1231" }}>
                                  {room.room_name}
                                </span>
                              </div>
                            );
                          } else {
                            return <div key={index}></div>;
                          }
                        } else if (filter_level === "Teacher") {
                          if (teacher_pin !== 0) {
                            let room = rooms.find(
                              (room) => (room.id = el.course_unit_room)
                            );
                            let codes = JSON.parse(el.course_unit_codes);
                            let teacher =
                              teachers.find(
                                (teacher) =>
                                  teacher.id === el.course_unit_teacher
                              ) || {};
                            let codes_str = "";
                            codes.forEach((code) => {
                              codes_str += `${code} `;
                            });
                            if (teacher.teacher_pin === teacher_pin) {
                              return (
                                <div key={index}>
                                  <div>
                                    <div style={{ color: "#12fd31" }}>
                                      {codes_str}
                                    </div>
                                    <div style={{ color: "#1231fd" }}>
                                      {teacher.teacher_name}
                                    </div>
                                    <span style={{ color: "#fd1231" }}>
                                      {room.room_name}
                                    </span>
                                  </div>
                                </div>
                              );
                            } else {
                              return <div key={index}></div>;
                            }
                          } else {
                            return <div key={index}></div>;
                          }
                        } else if (filter_level === "Admin") {
                          let room = rooms.find(
                            (room) => (room.id = el.course_unit_room)
                          );
                          let codes = JSON.parse(el.course_unit_codes);
                          let teacher =
                            teachers.find(
                              (teacher) => teacher.id === el.course_unit_teacher
                            ) || {};
                          let codes_str = "";
                          codes.forEach((code) => {
                            codes_str += `${code} `;
                          });
                          if (user.role === "Admin") {
                            return (
                              <div key={index}>
                                <div> {el.course_unit_name}</div> <br />
                              </div>
                            );
                          } else {
                            return (
                              <div key={index}>
                                <div
                                  style={
                                    user.id === el.course_unit_dept
                                      ? { fontWeight: "bold" }
                                      : { opacity: "0.45" }
                                  }
                                >
                                  <div style={{ color: "#12fd31" }}>
                                    {codes_str}
                                  </div>
                                  <div style={{ color: "#1231fd" }}>
                                    {teacher.teacher_name}
                                  </div>
                                  <span style={{ color: "#fd1231" }}>
                                    {room.room_name}
                                  </span>
                                </div>
                              </div>
                            );
                          }
                        } else if (filter_level === "class") {
                          let class_course_units = JSON.parse(
                            filter_class.class_course_units
                          );
                          if (
                            class_course_units.find(
                              (class_course_unit) =>
                                class_course_unit.id === el.id
                            )
                          ) {
                            let room = rooms.find(
                              (room) => (room.id = el.course_unit_room)
                            );
                            let codes = JSON.parse(el.course_unit_codes);
                            let teacher =
                              teachers.find(
                                (teacher) =>
                                  teacher.id === el.course_unit_teacher
                              ) || {};
                            let codes_str = "";
                            codes.forEach((code) => {
                              codes_str += `${code} `;
                            });

                            return (
                              <div key={index}>
                                <div>
                                  <div style={{ color: "#12fd31" }}>
                                    {codes_str}
                                  </div>
                                  <div style={{ color: "#1231fd" }}>
                                    {teacher.teacher_name}
                                  </div>
                                  <span style={{ color: "#fd1231" }}>
                                    {room.room_name}
                                  </span>
                                </div>
                              </div>
                            );
                          } else {
                            return <div key={index}></div>;
                          }
                        } else {
                          return <div key={index}></div>;
                        }
                      })}
                </div>
              );
            })}
            {/* <div></div>
            <div></div> */}
          </div>
          <div className="tt-body-row">
            <div>2:00pm to 3:00pm</div>
            {[1, 2, 3, 4, 5].map((v, i) => {
              return (
                <div key={i}>
                  {tt[i][6].length === 0
                    ? ""
                    : tt[i][6].map((el, index) => {
                        if (filter_level === "Dept") {
                          if (user.id === el.course_unit_dept) {
                            let room = rooms.find(
                              (room) => (room.id = el.course_unit_room)
                            );
                            let codes = JSON.parse(el.course_unit_codes);
                            let teacher =
                              teachers.find(
                                (teacher) =>
                                  teacher.id === el.course_unit_teacher
                              ) || {};
                            let codes_str = "";
                            codes.forEach((code) => {
                              codes_str += `${code} `;
                            });
                            return (
                              <div key={index}>
                                <span style={{ color: "12fd31" }}>
                                  {codes_str}
                                </span>
                                <span style={{ color: "1231fd" }}>
                                  {teacher.teacher_name}
                                </span>
                                <span style={{ color: "fd1231" }}>
                                  {room.room_name}
                                </span>
                              </div>
                            );
                          } else {
                            return <div key={index}></div>;
                          }
                        } else if (filter_level === "Teacher") {
                          if (teacher_pin !== 0) {
                            let room = rooms.find(
                              (room) => (room.id = el.course_unit_room)
                            );
                            let codes = JSON.parse(el.course_unit_codes);
                            let teacher =
                              teachers.find(
                                (teacher) =>
                                  teacher.id === el.course_unit_teacher
                              ) || {};
                            let codes_str = "";
                            codes.forEach((code) => {
                              codes_str += `${code} `;
                            });
                            if (teacher.teacher_pin === teacher_pin) {
                              return (
                                <div key={index}>
                                  <div>
                                    <div style={{ color: "#12fd31" }}>
                                      {codes_str}
                                    </div>
                                    <div style={{ color: "#1231fd" }}>
                                      {teacher.teacher_name}
                                    </div>
                                    <span style={{ color: "#fd1231" }}>
                                      {room.room_name}
                                    </span>
                                  </div>
                                </div>
                              );
                            } else {
                              return <div key={index}></div>;
                            }
                          } else {
                            return <div key={index}></div>;
                          }
                        } else if (filter_level === "Admin") {
                          let room = rooms.find(
                            (room) => (room.id = el.course_unit_room)
                          );
                          let codes = JSON.parse(el.course_unit_codes);
                          let teacher =
                            teachers.find(
                              (teacher) => teacher.id === el.course_unit_teacher
                            ) || {};
                          let codes_str = "";
                          codes.forEach((code) => {
                            codes_str += `${code} `;
                          });
                          if (user.role === "Admin") {
                            return (
                              <div key={index}>
                                <div> {el.course_unit_name}</div> <br />
                              </div>
                            );
                          } else {
                            return (
                              <div key={index}>
                                <div
                                  style={
                                    user.id === el.course_unit_dept
                                      ? { fontWeight: "bold" }
                                      : { opacity: "0.45" }
                                  }
                                >
                                  <div style={{ color: "#12fd31" }}>
                                    {codes_str}
                                  </div>
                                  <div style={{ color: "#1231fd" }}>
                                    {teacher.teacher_name}
                                  </div>
                                  <span style={{ color: "#fd1231" }}>
                                    {room.room_name}
                                  </span>
                                </div>
                              </div>
                            );
                          }
                        } else if (filter_level === "class") {
                          let class_course_units = JSON.parse(
                            filter_class.class_course_units
                          );
                          if (
                            class_course_units.find(
                              (class_course_unit) =>
                                class_course_unit.id === el.id
                            )
                          ) {
                            let room = rooms.find(
                              (room) => (room.id = el.course_unit_room)
                            );
                            let codes = JSON.parse(el.course_unit_codes);
                            let teacher =
                              teachers.find(
                                (teacher) =>
                                  teacher.id === el.course_unit_teacher
                              ) || {};
                            let codes_str = "";
                            codes.forEach((code) => {
                              codes_str += `${code} `;
                            });

                            return (
                              <div key={index}>
                                <div>
                                  <div style={{ color: "#12fd31" }}>
                                    {codes_str}
                                  </div>
                                  <div style={{ color: "#1231fd" }}>
                                    {teacher.teacher_name}
                                  </div>
                                  <span style={{ color: "#fd1231" }}>
                                    {room.room_name}
                                  </span>
                                </div>
                              </div>
                            );
                          } else {
                            return <div key={index}></div>;
                          }
                        } else {
                          return <div key={index}></div>;
                        }
                      })}
                </div>
              );
            })}
            {/* <div></div>
            <div></div> */}
          </div>
          <div className="tt-body-row">
            <div>3:00pm to 4:00pm</div>
            {[1, 2, 3, 4, 5].map((v, i) => {
              return (
                <div key={i}>
                  {tt[i][7].length === 0
                    ? ""
                    : tt[i][7].map((el, index) => {
                        if (filter_level === "Dept") {
                          if (user.id === el.course_unit_dept) {
                            let room = rooms.find(
                              (room) => (room.id = el.course_unit_room)
                            );
                            let codes = JSON.parse(el.course_unit_codes);
                            let teacher =
                              teachers.find(
                                (teacher) =>
                                  teacher.id === el.course_unit_teacher
                              ) || {};
                            let codes_str = "";
                            codes.forEach((code) => {
                              codes_str += `${code} `;
                            });
                            return (
                              <div key={index}>
                                <span style={{ color: "12fd31" }}>
                                  {codes_str}
                                </span>
                                <span style={{ color: "1231fd" }}>
                                  {teacher.teacher_name}
                                </span>
                                <span style={{ color: "fd1231" }}>
                                  {room.room_name}
                                </span>
                              </div>
                            );
                          } else {
                            return <div key={index}></div>;
                          }
                        } else if (filter_level === "Teacher") {
                          if (teacher_pin !== 0) {
                            let room = rooms.find(
                              (room) => (room.id = el.course_unit_room)
                            );
                            let codes = JSON.parse(el.course_unit_codes);
                            let teacher =
                              teachers.find(
                                (teacher) =>
                                  teacher.id === el.course_unit_teacher
                              ) || {};
                            let codes_str = "";
                            codes.forEach((code) => {
                              codes_str += `${code} `;
                            });
                            if (teacher.teacher_pin === teacher_pin) {
                              return (
                                <div key={index}>
                                  <div>
                                    <div style={{ color: "#12fd31" }}>
                                      {codes_str}
                                    </div>
                                    <div style={{ color: "#1231fd" }}>
                                      {teacher.teacher_name}
                                    </div>
                                    <span style={{ color: "#fd1231" }}>
                                      {room.room_name}
                                    </span>
                                  </div>
                                </div>
                              );
                            } else {
                              return <div key={index}></div>;
                            }
                          } else {
                            return <div key={index}></div>;
                          }
                        } else if (filter_level === "Admin") {
                          let room = rooms.find(
                            (room) => (room.id = el.course_unit_room)
                          );
                          let codes = JSON.parse(el.course_unit_codes);
                          let teacher =
                            teachers.find(
                              (teacher) => teacher.id === el.course_unit_teacher
                            ) || {};
                          let codes_str = "";
                          codes.forEach((code) => {
                            codes_str += `${code} `;
                          });
                          if (user.role === "Admin") {
                            return (
                              <div key={index}>
                                <div> {el.course_unit_name}</div> <br />
                              </div>
                            );
                          } else {
                            return (
                              <div key={index}>
                                <div
                                  style={
                                    user.id === el.course_unit_dept
                                      ? { fontWeight: "bold" }
                                      : { opacity: "0.45" }
                                  }
                                >
                                  <div style={{ color: "#12fd31" }}>
                                    {codes_str}
                                  </div>
                                  <div style={{ color: "#1231fd" }}>
                                    {teacher.teacher_name}
                                  </div>
                                  <span style={{ color: "#fd1231" }}>
                                    {room.room_name}
                                  </span>
                                </div>
                              </div>
                            );
                          }
                        } else if (filter_level === "class") {
                          let class_course_units = JSON.parse(
                            filter_class.class_course_units
                          );
                          if (
                            class_course_units.find(
                              (class_course_unit) =>
                                class_course_unit.id === el.id
                            )
                          ) {
                            let room = rooms.find(
                              (room) => (room.id = el.course_unit_room)
                            );
                            let codes = JSON.parse(el.course_unit_codes);
                            let teacher =
                              teachers.find(
                                (teacher) =>
                                  teacher.id === el.course_unit_teacher
                              ) || {};
                            let codes_str = "";
                            codes.forEach((code) => {
                              codes_str += `${code} `;
                            });

                            return (
                              <div key={index}>
                                <div>
                                  <div style={{ color: "#12fd31" }}>
                                    {codes_str}
                                  </div>
                                  <div style={{ color: "#1231fd" }}>
                                    {teacher.teacher_name}
                                  </div>
                                  <span style={{ color: "#fd1231" }}>
                                    {room.room_name}
                                  </span>
                                </div>
                              </div>
                            );
                          } else {
                            return <div key={index}></div>;
                          }
                        } else {
                          return <div key={index}></div>;
                        }
                      })}
                </div>
              );
            })}
            {/* <div></div>
            <div></div> */}
          </div>
          <div className="tt-body-row">
            <div>4:00pm to 5:00pm</div>
            {[1, 2, 3, 4, 5].map((v, i) => {
              return (
                <div key={i}>
                  {tt[i][8].length === 0
                    ? ""
                    : tt[i][8].map((el, index) => {
                        if (filter_level === "Dept") {
                          if (user.id === el.course_unit_dept) {
                            let room = rooms.find(
                              (room) => (room.id = el.course_unit_room)
                            );
                            let codes = JSON.parse(el.course_unit_codes);
                            let teacher =
                              teachers.find(
                                (teacher) =>
                                  teacher.id === el.course_unit_teacher
                              ) || {};
                            let codes_str = "";
                            codes.forEach((code) => {
                              codes_str += `${code} `;
                            });
                            return (
                              <div key={index}>
                                <span style={{ color: "12fd31" }}>
                                  {codes_str}
                                </span>
                                <span style={{ color: "1231fd" }}>
                                  {teacher.teacher_name}
                                </span>
                                <span style={{ color: "fd1231" }}>
                                  {room.room_name}
                                </span>
                              </div>
                            );
                          } else {
                            return <div key={index}></div>;
                          }
                        } else if (filter_level === "Teacher") {
                          if (teacher_pin !== 0) {
                            let room = rooms.find(
                              (room) => (room.id = el.course_unit_room)
                            );
                            let codes = JSON.parse(el.course_unit_codes);
                            let teacher =
                              teachers.find(
                                (teacher) =>
                                  teacher.id === el.course_unit_teacher
                              ) || {};
                            let codes_str = "";
                            codes.forEach((code) => {
                              codes_str += `${code} `;
                            });
                            if (teacher.teacher_pin === teacher_pin) {
                              return (
                                <div key={index}>
                                  <div>
                                    <div style={{ color: "#12fd31" }}>
                                      {codes_str}
                                    </div>
                                    <div style={{ color: "#1231fd" }}>
                                      {teacher.teacher_name}
                                    </div>
                                    <span style={{ color: "#fd1231" }}>
                                      {room.room_name}
                                    </span>
                                  </div>
                                </div>
                              );
                            } else {
                              return <div key={index}></div>;
                            }
                          } else {
                            return <div key={index}></div>;
                          }
                        } else if (filter_level === "Admin") {
                          let room = rooms.find(
                            (room) => (room.id = el.course_unit_room)
                          );
                          let codes = JSON.parse(el.course_unit_codes);
                          let teacher =
                            teachers.find(
                              (teacher) => teacher.id === el.course_unit_teacher
                            ) || {};
                          let codes_str = "";
                          codes.forEach((code) => {
                            codes_str += `${code} `;
                          });
                          if (user.role === "Admin") {
                            return (
                              <div key={index}>
                                <div> {el.course_unit_name}</div> <br />
                              </div>
                            );
                          } else {
                            return (
                              <div key={index}>
                                <div
                                  style={
                                    user.id === el.course_unit_dept
                                      ? { fontWeight: "bold" }
                                      : { opacity: "0.45" }
                                  }
                                >
                                  <div style={{ color: "#12fd31" }}>
                                    {codes_str}
                                  </div>
                                  <div style={{ color: "#1231fd" }}>
                                    {teacher.teacher_name}
                                  </div>
                                  <span style={{ color: "#fd1231" }}>
                                    {room.room_name}
                                  </span>
                                </div>
                              </div>
                            );
                          }
                        } else if (filter_level === "class") {
                          let class_course_units = JSON.parse(
                            filter_class.class_course_units
                          );
                          if (
                            class_course_units.find(
                              (class_course_unit) =>
                                class_course_unit.id === el.id
                            )
                          ) {
                            let room = rooms.find(
                              (room) => (room.id = el.course_unit_room)
                            );
                            let codes = JSON.parse(el.course_unit_codes);
                            let teacher =
                              teachers.find(
                                (teacher) =>
                                  teacher.id === el.course_unit_teacher
                              ) || {};
                            let codes_str = "";
                            codes.forEach((code) => {
                              codes_str += `${code} `;
                            });

                            return (
                              <div key={index}>
                                <div>
                                  <div style={{ color: "#12fd31" }}>
                                    {codes_str}
                                  </div>
                                  <div style={{ color: "#1231fd" }}>
                                    {teacher.teacher_name}
                                  </div>
                                  <span style={{ color: "#fd1231" }}>
                                    {room.room_name}
                                  </span>
                                </div>
                              </div>
                            );
                          } else {
                            return <div key={index}></div>;
                          }
                        } else {
                          return <div key={index}></div>;
                        }
                      })}
                </div>
              );
            })}
            {/* <div></div>
            <div></div> */}
          </div>
        </div>
      </div>
    );
  }
};
