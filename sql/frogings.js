'use strict';

var TransactionsSql = {
  sortFields: [
    'id',
    'status',
    'startTime',
    'insertTime',
    'rewardTime',
    'nextMilestone',
    'endTime',
    'senderId',
    'recipientId',
    'freezedAmount',
    'milestoneCount'
  ],

  count: 'SELECT COUNT("id")::int AS "count" FROM stake_orders',

  getMemoryAccounts: 'SELECT * FROM  mem_accounts',

  updateFrozeAmount: 'UPDATE mem_accounts SET "totalFrozeAmount" = ("totalFrozeAmount" + ${freezedAmount}) WHERE "address" = ${senderId}',

  getFrozeAmount: 'SELECT "totalFrozeAmount" FROM mem_accounts WHERE "address"=${senderId}',

  disableFrozeOrders: 'UPDATE stake_orders SET "status"=0 ,"nextMilestone"=-1 where "status"=1 AND ${totalMilestone} = "milestoneCount"',

  checkAndUpdateMilestone: 'UPDATE stake_orders SET "nextMilestone"= ("nextMilestone" +${milestone}),"rewardTime"=${currentTime}, "milestoneCount"=("milestoneCount" + 1) where "status"=1 AND ("startTime"+ ${currentTime} - "insertTime") >= "nextMilestone" AND (${currentTime} - "rewardTime")>= ${milestone} ',

  getfrozeOrder: 'SELECT "senderId" , "freezedAmount", "endTime", "milestoneCount", "nextMilestone" FROM stake_orders WHERE "status"=1 AND ("startTime"+ ${currentTime} - "insertTime") >= "nextMilestone" AND (${currentTime} - "rewardTime")>= ${milestone}',

  deductFrozeAmount: 'UPDATE mem_accounts SET "totalFrozeAmount" = ("totalFrozeAmount" - ${FrozeAmount}) WHERE "address" = ${senderId}',

  getFrozeOrders: 'SELECT * FROM stake_orders WHERE "senderId"=${senderId}',

  getActiveFrozeOrders: 'SELECT * FROM stake_orders WHERE "senderId"=${senderId} AND "status"=1',

  getActiveFrozeOrder: 'SELECT * FROM stake_orders WHERE "senderId"=${senderId} AND "id"=${frozeId} AND "status"=1',

  updateFrozeOrder : 'UPDATE stake_orders SET "status"=0,"recipientId"=${recipientId} WHERE "senderId"=${senderId} AND "id"=${frozeId} AND "status"=1',

  createNewFrozeOrder: 'INSERT INTO stake_orders ("id","status","startTime","insertTime","rewardTime","nextMilestone","endTime","senderId","freezedAmount","milestoneCount") VALUES (${frozeId},1,${startTime},${insertTime},${rewardTime},${nextMilestone},${endTime},${senderId},${freezedAmount},${milestoneCount}) ',

  countStakeholders : 'SELECT count(DISTINCT "senderId") FROM stake_orders WHERE "status"=1',

  getTotalStakedAmount : 'SELECT sum("freezedAmount") FROM stake_orders WHERE "status"=1',

  getMyStakedAmount : 'SELECT sum("freezedAmount") FROM stake_orders WHERE "senderId"=${address} AND "status"=1'

};

module.exports = TransactionsSql;
