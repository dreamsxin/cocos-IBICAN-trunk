/** 
 * @Description: 活动事件id
 * @Author: weiliang.huang  
 * @Date: 2019-03-28 10:48:42 
 * @Last Modified by: luoyong
 * @Last Modified time: 2021-09-09 16:22:20
 */

export enum ActivityEventId {
    ACTIVITY_ADD = "ACTIVITY_ADD",
    ACTIVITY_REMOVE = "ACTIVITY_REMOVE",

    UPDATE_KFCB_ACT_REWARD = "UPDATE_KFCB_ACT_REWARD",//更新奖励领取状态

    KFFL_CLOSE = "KFFL_CLOSE",

    ACTIVITY_ICON_SHOW = "ACTIVITY_ICON_SHOW",
    ACTIVITY_ICON_HIDE = "ACTIVITY_ICON_HIDE",

    ACTIVITY_TIME_IS_OVER = "ACTIVITY_TIME_IS_OVER", //活动到期

    UPDATE_NEW_DAY = "UPDATE_NEW_DAY", //跨天

    ACTIVITY_FLIP_CARD_FLIP_TIME_CHANGE = "ACTIVITY_FLIP_CARD_FLIP_TIME_CHANGE", //翻牌次数改变

    ACTIVITY_TWISTED_ANI_END = "ACTIVITY_TWISTED_ANI_END", // 扭蛋动画结束

    ACTIVITY_MINE_HERO_SELECTED = "ACTIVITY_MINE_HERO_SELECTED",    // 矿洞副本探索英雄上阵
    ACTIVITY_MINE_HERO_UN_SELECTED = "ACTIVITY_MINE_HERO_UN_SELECTED",  // 矿洞副本探索英雄下阵
    ACTIVITY_MINE_HERO_CHOOSE_PANEL_CLICK = "ACTIVITY_MINE_HERO_CHOOSE_PANEL_CLICK",    // 矿洞副本探索英雄选择面板选择了英雄
    ACTIVITY_MINE_EXCHANGE_REFRESH = "ACTIVITY_MINE_EXCHANGE_REFRESH",      //矿洞大作战兑换物品刷新事件 
    ACTIVITY_MINE_TANSUOUPHERO = "ACTIVITY_MINE_TANSUOUPHERO",      //矿洞大作战探索上阵英雄 
    ACTIVITY_MINE_PASS_REWARD = "ACTIVITY_MINE_PASS_REWARD",      //矿洞大作战通行证奖励领取刷新 
    ACTIVITY_MINE_GIFT_CHANGE = "ACTIVITY_MINE_GIFT_CHANGE",      //矿洞大作战天赋点刷新 

    ACTIVITY_EXCITING_ACT_INFO_UPDATE = "ACTIVITY_EXCITING_ACT_INFO_UPDATE", //精彩活动信息改变
    ACTIVITY_STAR_GIFTS_REWARD_TYPE_UPDATE = "ACTIVITY_STAR_GIFTS_REWARD_TYPE_UPDATE", //升星好礼周期更新

    ACTIVITY_HEROTRIAL_CHALLENGEREWARD_UPDATE = "ACTIVITY_HEROTRIAL_CHALLENGEREWARD_UPDATE", //英雄试炼领取挑战奖励信息
    ACTIVITY_HEROTRIAL_DAMAGEREWARD_UPDATE = "ACTIVITY_HEROTRIAL_DAMAGEREWARD_UPDATE", //英雄试炼伤害奖励

    ACTIVITY_PEAK_RANK_REWARD_UPDATE = "ACTIVITY_PEAK_RANK_REWARD_UPDATE",  //巅峰之战段位奖励
    ACTIVITY_PEAK_CHANGE_REWARD_UPDATE = "ACTIVITY_PEAK_CHANGE_REWARD_UPDATE", //巅峰之战挑战奖励
    ACTIVITY_PEAK_CHANGEHERO_SELECT_UPDATE = "ACTIVITY_PEAK_CHANGEHERO_SELECT_UPDATE", //巅峰之战转换英雄选中消息
    ACTIVITY_PEAK_CHANGEHERO_OK_UPDATE = "ACTIVITY_PEAK_CHANGEHERO_OK_UPDATE", //巅峰之战转换英雄选中消息
    ACTIVITY_PEAK_CHANGE_CAREER_UPDATE = "ACTIVITY_PEAK_CHANGE_CAREER_UPDATE",  //巅峰之战转换职业

    ACTIVITY_CROSS_TREASURE_INFO_UPDATE = "ACTIVITY_CROSS_TREASURE_INFO_UPDATE", //跨服寻宝 数量信息变化
    ACRIVITY_GUARDIANTOWER_REFRESH_RAINNUM = "ACRIVITY_GUARDIANTOWER_REFRESH_RAINNUM",// 护使秘境 刷新扫荡次数

    ACTIVITY_LINK_GAME_INFO_UPDATE = "ACTIVITY_LINK_GAME_INFO_UPDATE", //幸运连连看信息改变

    ACTIVITY_CAVE_EMIT_CLICK_PLATE = "ACTIVITY_CAVE_EMIT_CLICK_PLATE", //矿洞大作战点击了地块
    ACTIVITY_CAVE_TRIGGER_PASS_EVENT = "ACTIVITY_CAVE_TRIGGER_PASS_EVENT", //矿洞大作战触发地块经过事件
    ACTIVITY_CAVE_INFO_UPDATE = "ACTIVITY_CAVE_INFO_UPDATE", //矿洞红点更新

    COSTUME_CUSTOM_SELECT_INFO_CHANGE = "COSTUME_CUSTOM_SELECT_INFO_CHANGE", //定制神装 选择信息改变

    ACTIVITY_OPEN_CONDITION_SATISFY = "ACTIVITY_OPEN_CONDITION_SATISFY", // 活动开启条件满足
    ACTIVITY_STORAGE_NEW_FALG_HIDE = "ACTIVITY_STORAGE_NEW_FALG_HIDE", //收纳界面隐藏新标志
    ACTIVITY_STORAGE_MAIN_ICON_HIDE = "ACTIVITY_STORAGE_MAIN_ICON_HIDE", //隐藏收纳界面主图标

    ACTIVITY_WEAPON_ICON_HIDE = "ACTIVITY_WEAPON_ICON_HIDE", //神器图标隐藏

    ACTIVITY_MYSTERY_HERO = "ACTIVITY_MYSTERY_HERO",//神秘者活动界面跳转

    ACTIVITY_ROYAL_RANK_REWARD_UPDATE = 'ACTIVITY_ROYAL_RANK_REWARD_UPDATE',//皇家竞技场排行奖励领取更新
}