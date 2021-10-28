import ConfigManager from '../../../common/managers/ConfigManager';
import GlobalUtil from '../../../common/utils/GlobalUtil';
import NetManager from '../../../common/managers/NetManager';
import StringUtils from '../../../common/utils/StringUtils';
import UiListItem from '../../../common/widgets/UiListItem';
import { ArenaTeamEvent } from '../enum/ArenaTeamEvent';
import { Teamarena_divisionCfg } from '../../../a/config';

/** 
 * @Description: 组队竞技场组队大厅TeamNodeItem
 * @Author: yaozu.hu
 * @Date: 2021-02-01 10:50:41
 * @Last Modified by: yaozu.hu
 * @Last Modified time: 2021-02-04 13:46:48
 */
const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("qszc/view/arenaTeam/TeamNodeItemCtrl")
export default class TeamNodeItemCtrl extends UiListItem {

    @property(cc.Label)
    nameLabel: cc.Label = null;
    @property(cc.Label)
    lvLabel: cc.Label = null;
    @property(cc.Label)
    powerLabel: cc.Label = null;
    @property(cc.Node)
    iconNode: cc.Node = null;
    @property(cc.Sprite)
    frameIcon: cc.Sprite = null;
    @property(cc.Label)
    scoreLabel: cc.Label = null;
    @property(cc.Label)
    rankLabel: cc.Label = null;
    @property(cc.Sprite)
    rankIcon: cc.Sprite = null;
    @property(cc.Button)
    inviterBtn: cc.Button = null;

    isTeamers: boolean = false;
    info: icmsg.ArenaTeamPlayer;
    updateView() {

        this.info = this.data.data;
        this.isTeamers = this.data.isTeamers;
        let d = this.info.brief
        this.nameLabel.string = d.name;
        this.lvLabel.string = '.' + d.level;
        this.powerLabel.string = d.power + '';
        this.rankLabel.string = this.info.rank > 0 ? StringUtils.format(gdk.i18n.t("i18n:ARENATEAM_TIP5"), this.info.rank) : gdk.i18n.t("i18n:ARENATEAM_TIP6")
        this.scoreLabel.string = this.info.score + '';
        GlobalUtil.setSpriteIcon(this.node, this.iconNode, GlobalUtil.getHeadIconById(d.head));
        GlobalUtil.setSpriteIcon(this.node, this.frameIcon, GlobalUtil.getHeadFrameById(d.headFrame));
        //设置段位图标
        let curCfgs = ConfigManager.getItems(Teamarena_divisionCfg, (cfg: Teamarena_divisionCfg) => {
            if (cfg.point <= this.info.score) {
                return true;
            }
            return false
        });
        let path2 = 'view/champion/texture/champion/jbs_duanwei0' + curCfgs[curCfgs.length - 1].division;
        GlobalUtil.setSpriteIcon(this.node, this.rankIcon, path2);
        let state: 0 | 1 = this.isTeamers ? 0 : 1;
        GlobalUtil.setAllNodeGray(this.inviterBtn.node, state)
        this.inviterBtn.interactable = this.isTeamers;
    }

    onDisable() {
        NetManager.targetOff(this)
    }

    inviterBtnClick() {
        //邀请按钮
        let msg = new icmsg.ArenaTeamInviteReq()
        msg.playerId = this.info.brief.id
        NetManager.send(msg, () => {

            gdk.e.emit(ArenaTeamEvent.RSP_ARENATEAM_INVITER, this.info);
        }, this)
    }

}
