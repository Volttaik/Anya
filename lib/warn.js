import Cg from "../config.js";

class WARN {

  static async data(db, id) {
    const d = await db.get({ dbType: "USER", id });
    return d?.warn || null;
  }

  static async addWarn(db, { id, reason, by }) {
    const data = await this.data(db, id);
    if (!data) {
      const newData = {
        warns: Cg.MAX_WARNS - 1,
        warnedBy: by || null,
        reason: reason || "No reason specified",
      };
      await db.create({
        data: { id, warn: newData },
        dbType: "USER",
        allowNew: true,
        allowUpdate: true,
      });
      return {
        warns: newData.warns,
        message: "UPDATED WARNS",
      };
    }
    if (data.warns === 0) {
      return {
        warns: 0,
        message: "ALREADY EXCEEDED WARN LIMIT",
      };
    }
    const updatedWarns = data.warns - 1;
    await db.create({
      data: { id, warn: { ...data, warns: updatedWarns, warnedBy: by, reason } },
      dbType: "USER",
      allowNew: true,
      allowUpdate: true,
    });
    return {
      warns: updatedWarns,
      message: "UPDATED WARNS",
    };
  }

  static async delWarn(db, { id }) {
    const data = await this.data(db, id);
    if (!data || data.warns === Cg.MAX_WARNS) {
      return {
        warns: Cg.MAX_WARNS,
        message: "ALREADY NO WARN",
      };
    }
    const updatedWarns = data.warns + 1;
    if (updatedWarns === Cg.MAX_WARNS) {
      await db.delete({ id, key: "warn", dbType: "USER" });
      return {
        warns: Cg.MAX_WARNS,
        message: "WARN RESET TO DEFAULT",
      };
    }
    await db.create({
      data: { id, warn: { warns: updatedWarns } },
      dbType: "USER",
      allowNew: true,
      allowUpdate: true,
    });
    return {
      warns: updatedWarns,
      message: "UPDATED WARNS",
    };
  }
  
}

export default WARN;