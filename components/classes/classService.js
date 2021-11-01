var connection = require("../../connection/mysqlConnection");

exports.getTempData = async() => {
    var result = [{id: 1, name: "LTW", description: "Lớp lập trình window", topic: "IT"}, {id: 2, name: "PTUDW", description: "Lớp phát triển ứng dụng web", topic: "Web"}, {id: 3, name: "TKGD", description: "Lớp thiết kế giao diện", topic: "IT"}]
    return result;
}

exports.getClasses = async() => {
    var sql = 'SELECT * FROM zedSOubhoQ.Classroom;';
    result = await new Promise ((resolve, reject)=>{
        connection.query(sql,(err, result) => {
            if (err) return resolve(null);
            return resolve(result);
        })
    });
    return result;
}

exports.addNewClass = async (data) => {

    var id = await getMaxID();
    id += 1;

    //current day
    var date_ob = new Date();
    var date = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();
    var hours = date_ob.getHours();
    var minutes = date_ob.getMinutes();
    var seconds = date_ob.getSeconds();
    var datetime = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

    //Add to hcmus_book_store.book_info
    var sql =
      "INSERT INTO zedSOubhoQ.Classroom (ID, ClassName, Description, Topic, HostID, Created_Date, Members, Status) VALUES ";
    sql =
      sql +
      "('C" +
      id +
      "', '" +
      data.classname +
      "', '" +
      data.description +
      "', '" +
      data.topic +
      "', 'U1" +
      "', '" +
      datetime +
      "', 1, 'active')";
    await queryAsync(sql);
    return;
};

async function getMaxID() {
    var sql = "SELECT Count(ID) FROM zedSOubhoQ.Classroom;";
    var result = await queryAsync(sql);
    return result[0]['Count(ID)'];
}

async function queryAsync(sql) {
    return new Promise((resolve, reject) => {
      connection.query(sql, (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    });
}