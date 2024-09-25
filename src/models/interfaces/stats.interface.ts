export interface IStatsUser {
    total: number;
    admin: number;
    personnel: number;
    employed: number;
  }
  
export  interface IStatsTask {
    total: number;
    completed: number;
    cancelled: number;
  }
  
export  interface ISummaryReports {
    total: number;
    approvedTotal: number;
    rejectedTotal: number;
  }
  
export  interface ISummaryLostObject {
    total: number;
    claimedTotal: number;
    lostTotal: number;
  }