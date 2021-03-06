import BaseController, { GdkEventArray, NetEventArray } from '../../core/BaseController';
import ModelManager from '../ModelManager';
import PiecesModel from '../../models/PiecesModel';
import RoleModel from '../../models/RoleModel';
import { PiecesEventId } from '../../../view/pieces/enum/PiecesEventId';
import { RedPointEvent } from '../../utils/RedPointUtils';

/** 
  * @Author: jiangping  
  * @Description: 
  * @Date: 2021-05-17 17:35:17 
  */
export default class PiecesController extends BaseController {
    get gdkEvents(): GdkEventArray[] {
        return []
    }

    get netEvents(): NetEventArray[] {
        return [
            [icmsg.PiecesInfoRsp.MsgType, this._onPiecesInfoRsp, this],
            [icmsg.PiecesGainDivisionRewardRsp.MsgType, this._onPiecesGainDivisionRewardRsp, this],
            [icmsg.PiecesLightUpTalentRsp.MsgType, this._onPiecesLightUpTalentRsp, this],
            [icmsg.PiecesHeroListRsp.MsgType, this._onPiecesHeroListRsp, this],
            [icmsg.PiecesHeroUpdateRsp.MsgType, this._onPiecesHeroUpdateRsp, this],
            [icmsg.PiecesHeroOnBattleRsp.MsgType, this._onPiecesHeroOnBattleRsp, this],
            [icmsg.PiecesBuyHeroPanelRsp.MsgType, this._onPiecesBuyHeroPanelRsp, this],
            [icmsg.PiecesRefreshBuyHeroPanelRsp.MsgType, this._onPiecesRefreshBuyHeroPanelRsp, this],
            [icmsg.PiecesBuyHeroRsp.MsgType, this._onPiecesBuyHeroRsp, this],
            [icmsg.PiecesLockBuyHeroPanelRsp.MsgType, this._onPiecesLockBuyHeroPanelRsp, this],
            [icmsg.PiecesRoundEndRsp.MsgType, this._onPiecesRoundRsp, this],
            [icmsg.PiecesExitRsp.MsgType, this._onPiecesExitRsp, this],
            [icmsg.PiecesSellHeroRsp.MsgType, this._onPiecesSellHeroRsp, this],
            [icmsg.PiecesBuyTimeRsp.MsgType, this._onPiecesBuyTimeRsp, this],
            [icmsg.PiecesHeroChangeLineRsp.MsgType, this._onPiecesHeroChangeLineRsp, this],
            [icmsg.PiecesUpgradeChessBoardRsp.MsgType, this._onPiecesUpgradeChessBoardRsp, this],
        ];
    }

    model: PiecesModel = null
    onStart() {
        this.model = ModelManager.get(PiecesModel)
    }

    onEnd() {
        this.model = null
    }

    //??????????????? ????????????
    _onPiecesInfoRsp(resp: icmsg.PiecesInfoRsp) {
        this.model.restChallengeTimes = resp.restChallengeTimes;
        this.model.restBuyTimes = resp.restBuyTimes;
        this.model.score = resp.score;
        this.model.talentPoint = resp.talentPoint;
        this.model.divisionRewardMap = {};
        this.model.talentMap = {};
        this.model.divisionRewardMap = this._finalCheckRewards(resp.gainRankAward, this.model.divisionRewardMap);
        this.model.talentMap = this._finalCheckRewards(resp.talentList, this.model.talentMap);
        gdk.e.emit(RedPointEvent.RED_POINT_STATUS_UPDATE);
    }

    //??????????????????
    _onPiecesGainDivisionRewardRsp(resp: icmsg.PiecesGainDivisionRewardRsp) {
        this.model.divisionRewardMap[resp.rank] = 1;
        gdk.e.emit(RedPointEvent.RED_POINT_STATUS_UPDATE);
    }

    //????????????
    _onPiecesLightUpTalentRsp(resp: icmsg.PiecesLightUpTalentRsp) {
        this.model.talentPoint = resp.talentPoint;
        if (resp.talentId == 0) this.model.talentMap = {};
        else {
            this.model.talentMap[resp.talentId] = 1;
        }
    }

    //????????????
    _onPiecesHeroListRsp(resp: icmsg.PiecesHeroListRsp) {
        this.model.heroMap = {};
        resp.list.forEach(l => {
            if (l.heroId) {
                this.model.heroMap[l.heroId] = l;
            }
        });
    }

    //???????????? (????????????)
    _onPiecesHeroUpdateRsp(resp: icmsg.PiecesHeroUpdateRsp) {
        if (resp.updateHero && resp.updateHero.heroId) {
            let b = !this.model.heroMap[resp.updateHero.heroId];
            this.model.heroMap[resp.updateHero.heroId] = resp.updateHero;
            if (!b) {
                //??????
                gdk.e.emit(PiecesEventId.PIECES_PVP_HERO_UP_STAR, [1, ModelManager.get(RoleModel).name, resp.updateHero]);
            }
        }

        resp.delHeroId.forEach(l => {
            delete this.model.heroMap[l];
            gdk.e.emit(PiecesEventId.PIECES_PVP_REMOVE_HERO, l);
        });

        gdk.e.emit(PiecesEventId.PIECES_HAND_CARD_UPDATE);
    }

    //???????????????
    _onPiecesHeroOnBattleRsp(resp: icmsg.PiecesHeroOnBattleRsp) {
        resp.changeList.forEach(l => {
            if (l.heroId) {
                let old = JSON.parse(JSON.stringify(this.model.heroMap[l.heroId]));
                this.model.heroMap[l.heroId] = l;
                gdk.e.emit(PiecesEventId.PIECES_PVP_HERO_ON_BATTLE, { old: old, new: l });
            }
        });
        gdk.e.emit(PiecesEventId.PIECES_HAND_CARD_UPDATE);
    }

    /**?????????????????? */
    _onPiecesHeroChangeLineRsp(resp: icmsg.PiecesHeroChangeLineRsp) {
        resp.hero.forEach(l => {
            if (l.heroId) {
                this.model.heroMap[l.heroId] = l;
            }
        });
        gdk.e.emit(PiecesEventId.PIECES_PVP_CAREER_CHANGE, resp.hero[0].typeId);
    }

    /**?????????????????? */
    _onPiecesBuyHeroPanelRsp(resp: icmsg.PiecesBuyHeroPanelRsp) {
        this.model.refreshHeroList = resp.list;
        this.model.refreshIsLock = resp.isLock;
        this.model.silver = resp.silver;
    }

    /**???????????????????????? */
    _onPiecesRefreshBuyHeroPanelRsp(resp: icmsg.PiecesRefreshBuyHeroPanelRsp) {
        this.model.refreshHeroList = resp.list;
        this.model.silver = resp.silver;
    }

    /**???????????? */
    _onPiecesBuyHeroRsp(resp: icmsg.PiecesBuyHeroRsp) {
        this.model.refreshHeroList[resp.pos] = 0;
        this.model.silver = resp.silver;
    }

    /**???????????????????????? */
    _onPiecesLockBuyHeroPanelRsp(resp: icmsg.PiecesLockBuyHeroPanelRsp) {
        this.model.refreshIsLock = resp.isLook;
    }

    /**???????????? */
    _onPiecesSellHeroRsp(resp: icmsg.PiecesSellHeroRsp) {
        this.model.silver = resp.silver;
    }

    /**???????????? */
    _onPiecesUpgradeChessBoardRsp(resp: icmsg.PiecesUpgradeChessBoardRsp) {
        this.model.silver = resp.silver;
        if (resp.boardLv !== this.model.chessLv) {
            this.model.chessLv = resp.boardLv;
            gdk.gui.showMessage('????????????,???????????????????????????');
        }
        this.model.chessExp = resp.boardExp;
    }

    /**????????????????????? */
    _onPiecesBuyTimeRsp(resp: icmsg.PiecesBuyTimeRsp) {
        gdk.gui.showMessage('????????????');
        this.model.restBuyTimes = resp.restBuyTimes;
        this.model.restChallengeTimes += 1;
    }

    /**???????????? */
    _onPiecesRoundRsp(resp: icmsg.PiecesRoundEndRsp) {
        this.model.addScore += resp.divisionPoint;
        this.model.score += resp.divisionPoint;
        this.model.silver = resp.silver;
        if (this.model.chessLv !== resp.boardLv) {
            this.model.chessLv = resp.boardLv;
        }
        this.model.chessExp = resp.boardExp;
    }

    /**???????????? */
    _onPiecesExitRsp(resp: icmsg.PiecesExitRsp) {
        // this.model.talentPoint = resp.talentPoint;
        this.model.score = resp.score;
    }

    _finalCheckRewards(intReward: number[], rewardIds) {
        let idsArray = [];
        for (let i = 0; i < intReward.length; i += 2) {
            idsArray.push([intReward[i], intReward[i + 1]]);
        }
        idsArray.forEach(ids => {
            let minId = ids[0];
            let maxId = ids[1];
            while (minId <= maxId) {
                rewardIds[minId] = 1;
                minId += 1;
            }
        });
        return rewardIds;
    }
}
