import ConfigManager from '../../../common/managers/ConfigManager';
import GlobalUtil from '../../../common/utils/GlobalUtil';
import HeroModel from '../../../common/models/HeroModel';
import HeroUtils from '../../../common/utils/HeroUtils';
import ModelManager from '../../../common/managers/ModelManager';
import ResonatingModel from '../../resonating/model/ResonatingModel';
import ResonatingUtils from '../../resonating/utils/ResonatingUtils';
import UiListItem from '../../../common/widgets/UiListItem';
import { BagItem } from '../../../common/models/BagModel';
import { HeroCfg } from '../../../a/config';





/** 
 * @Description: 角色英雄面板-选择面板子项
 * @Author: weiliang.huang  
 * @Date: 2019-03-28 17:21:18 
 * @Last Modified by: yaozu.hu
 * @Last Modified time: 2021-05-25 17:03:41
 */

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("qszc/view/lottery/HeroGoBackItemCtrl")
export default class HeroGoBackItemCtrl extends UiListItem {


    @property(cc.Node)
    bgNode: cc.Node = null;

    @property(cc.Node)
    selectNode: cc.Node = null

    @property(cc.Label)
    lvLab: cc.Label = null;

    @property(cc.Sprite)
    icon: cc.Sprite = null;

    @property(cc.Label)
    starLab: cc.Label = null;
    @property(cc.Node)
    maxStarNode: cc.Node = null;
    @property(cc.Label)
    maxStarLb: cc.Label = null;

    @property(cc.Node)
    careerIcon: cc.Node = null;

    @property(cc.Node)
    groupIcon: cc.Node = null;

    @property(cc.Sprite)
    colorBg: cc.Sprite = null

    @property(cc.Node)
    heroUp: cc.Node = null;

    @property(cc.Node)
    lock: cc.Node = null

    heroInfo: icmsg.HeroInfo = null
    heroCfg: HeroCfg = null
    quality: number = 0
    get model(): HeroModel { return ModelManager.get(HeroModel); }
    upHeros: number[];
    //isHeroAwake: boolean = false;
    get resonatingModel(): ResonatingModel { return ModelManager.get(ResonatingModel); }

    updateView() {
        let item: BagItem = this.data.data;
        this.upHeros = this.data.heros;
        this.selectNode.active = this.data.isSelect;

        this.heroInfo = <icmsg.HeroInfo>item.extInfo;
        let level = this.heroInfo.level || 1;
        this.lvLab.string = `${level}`;

        let icon = HeroUtils.getHeroHeadIcon(this.heroInfo.typeId, this.heroInfo.star, false)
        GlobalUtil.setSpriteIcon(this.node, this.icon, icon);

        //设置等级颜色
        //let resonatingModel = ModelManager.get(ResonatingModel)
        let temState = this.resonatingModel.getHeroInUpList(this.heroInfo.heroId)
        this.lvLab.node.color = temState ? cc.color('#43FDFF') : cc.color('#FFFFFF')
        this.heroCfg = ConfigManager.getItemById(HeroCfg, this.heroInfo.typeId);
        GlobalUtil.setSpriteIcon(this.node, this.groupIcon, `common/texture/role/select/group_${this.heroCfg.group[0]}`);
        //let careerType = ConfigManager.getItemByField(Hero_careerCfg, 'career_id', this.heroInfo.careerId).career_type;
        let type = Math.floor((<icmsg.HeroInfo>item.extInfo).soldierId / 100);
        GlobalUtil.setSpriteIcon(this.node, this.careerIcon, `common/texture/role/select/career_${type}`);
        GlobalUtil.setSpriteIcon(this.node, this.colorBg, `common/texture/role/select/quality_bg_0${this.heroInfo.color}`);
        this._updateStar();
        if (this.heroUp) {
            this.heroUp.active = false;
            //let upData = this.model.PveUpHeroList;//GlobalUtil.getLocal('Role_setUpHero_pve')
            if (this.upHeros.indexOf(item.series) >= 0) {
                this.heroUp.active = true;
                GlobalUtil.setSpriteIcon(this.node, this.heroUp, 'view/role/texture/select/yx_zhanxiaozi');
            }
            else if (ResonatingUtils.isHeroInAssistAllianceList(item.series)) {
                this.heroUp.active = true;
                GlobalUtil.setSpriteIcon(this.node, this.heroUp, 'view/role/texture/select/xzlm_lian');
            }
        }

        let b = HeroUtils.heroLockCheck(this.heroInfo, false);
        this.lock.active = b;
        GlobalUtil.setAllNodeGray(this.bgNode, b ? 1 : 0);

    }

    // _itemSelect() {
    //     this.selectNode.active = this.data.isSelect;
    // }

    check() {
        this.data.isSelect = !this.data.isSelect
        this.selectNode.active = this.data.isSelect;
    }

    /**更新星星数量 */
    _updateStar() {
        let starNum = this.heroInfo.star;
        if (starNum >= 12 && this.maxStarNode) {
            this.starLab.node.active = false;
            this.maxStarNode.active = true;
            this.maxStarLb.string = (starNum - 11) + ''
        } else {
            this.starLab.node.active = true;
            this.maxStarNode ? this.maxStarNode.active = false : 0;
            let starTxt = "";
            if (starNum > 5) {
                starTxt = '1'.repeat(starNum - 5);
            }
            else {
                starTxt = '0'.repeat(starNum);
            }
            this.starLab.string = starTxt;
        }


    }
}
