const pgErrors = {
    "23000": {
      error: "integrity_constraint_violation",
      message: "",
    },
    "23001": {
      error: "restrict_violation",
      message: ""
    },
    "23502": {
      error: "not_null_violation",
      message: "Null value not allowed"
    },
    "23503": {
      error: "foreign_key_violation",
      message: "Invalid relationship!"
    },
    "23505": {
      error: "unique_violation",
      message: "Duplicate Entry!"
    },
    "23514": {
      error: "check_violation",
      message: "Not under specified range. Please Check!"
    },
    "23P01": {
      error: "exclusion_violation",
      message: ""
    },
  };
  
  const parseDatabaseError = (err) => {
    const errCode = err?.code;
    console.log(`DB Error: ${err.code} - ${err.table} - ${err.column} - ${err.message}`);
    if (errCode) {
      return pgErrors[errCode]?.message;
    }
  
    return err?.message;
  };
  
  module.exports = {parseDatabaseError};
  