/*
 * @Author: luoyong 
 * @Date: 2020-03-16 20:50:35 
 * @Last Modified by: jiangping
 * @Last Modified time: 2021-06-18 10:21:25
 */
/*
 * @Author: luoyong 
 * @Date: 2020-02-13 14:09:25 
 * @Last Modified by: luoyong
 * @Last Modified time: 2020-02-24 10:54:36
 */

export enum GuildEventId {


    REQ_GUILD_DETAIL = "REQ_GUILD_DETAIL",//公会详情
    REQ_GUILD_CAMP = "REQ_GUILD_CAMP",//公会营地
    REQ_GUILD_CREATE = "REQ_GUILD_CREATE",//创建公会
    REQ_GUILD_REQUESTS = "REQ_GUILD_REQUESTS",//查看申请
    REQ_GUILD_CHECK = "REQ_GUILD_CHECK",//会长审批
    REQ_GUILD_KICK = "REQ_GUILD_KICK",//踢出公会
    REQ_GUILD_SET_TITLE = "REQ_GUILD_SET_TITLE",//设置成员会职位
    REQ_GUILD_SET_CAMP = "REQ_GUILD_SET_CAMP",//设置营地位置
    REQ_GUILD_SIGN_INFO = "REQ_GUILD_SIGN_INFO",//公会签到信息

    /**据点战 */
    REQ_GUILD_STHWAR_DETAIL = "REQ_GUILD_STHWAR_DETAIL",//据点战信息


    UPDATE_GUILD_MEMBERS = "UPDATE_GUILD_MEMBERS",
    REMOVE_GUILD_MEMBER = "REMOVE_GUILD_MEMBER",
    REFRESH_GUILD_PRESIDENT = "REFRESH_GUILD_PRESIDENT",//移交会长，刷新权限
    UPDATE_GUILD_SIGN_INFO = "UPDATE_GUILD_SIGN_INFO",//公会签到更新

    /**公会Boss */
    UPDATE_GUILD_BOSS_DAMAGE_RANK_INFO = "UPDATE_GUILD_BOSS_DAMAGE_RANK_INFO", //公会BOSS伤害排行榜更新
    UPDATE_GUILD_BOSS_OPEN = "UPDATE_GUILD_BOSS_OPEN", //公会Boss开启关闭积分改变
    UPDATE_GUILD_BOSS_HP_CHANGE = "UPDATE_GUILD_BOSS_HP_CHANGE",//公会Boss血量变化

    /**红包 */
    UPDATE_ENVELOPE_LIST = "UPDATE_ENVELOPE_LIST", //红包列表更新
    GUILD_RED_ENVELOPE_UPDATE = "GUILD_RED_ENVELOPE_UPDATE", //红包红点

    /**团队远征 */
    EXPEDITION_TASK_UPDATE = "EXPEDITION_TASK_UPDATE", //团队远征任务更新
    EXPEDITION_POWER_UPDATE = "EXPEDITION_POWER_UPDATE", //团队远征战力更新
}