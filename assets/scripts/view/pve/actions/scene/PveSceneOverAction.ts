import {
    Adventure2_adventureCfg,
    AdventureCfg,
    Copy_stageCfg,
    MonsterCfg,
    Pieces_globalCfg,
    Pve_bornCfg,
    Pve_bossbornCfg,
    Pve_mainCfg
} from '../../../../a/config';
import ConfigManager from '../../../../common/managers/ConfigManager';
import ErrorManager from '../../../../common/managers/ErrorManager';
import ModelManager from '../../../../common/managers/ModelManager';
import NetManager from '../../../../common/managers/NetManager';
import ArenaHonorModel from '../../../../common/models/ArenaHonorModel';
import PiecesModel from '../../../../common/models/PiecesModel';
import RoleModel from '../../../../common/models/RoleModel';
import RoyalModel from '../../../../common/models/RoyalModel';
import WorldHonorModel from '../../../../common/models/WorldHonorModel';
import CopyUtil from '../../../../common/utils/CopyUtil';
import GuideUtil from '../../../../common/utils/GuideUtil';
import PanelId from '../../../../configs/ids/PanelId';
import GuideModel from '../../../../guide/model/GuideModel';
import GuardianTowerModel from '../../../act/model/GuardianTowerModel';
import PeakModel from '../../../act/model/PeakModel';
import AdventureModel from '../../../adventure/model/AdventureModel';
import NewAdventureModel from '../../../adventure2/model/NewAdventureModel';
import ArenaTeamViewModel from '../../../arenaTeam/model/ArenaTeamViewModel';
import ChampionModel from '../../../champion/model/ChampionModel';
import ExpeditionModel from '../../../guild/ctrl/expedition/ExpeditionModel';
import FootHoldModel from '../../../guild/ctrl/footHold/FootHoldModel';
import SiegeModel from '../../../guild/ctrl/siege/SiegeModel';
import GuildModel from '../../../guild/model/GuildModel';
import { InstanceEventId, InstanceID } from '../../../instance/enum/InstanceEnumDef';
import InstanceModel from '../../../instance/model/InstanceModel';
import RelicModel from '../../../relic/model/RelicModel';
import VaultModel from '../../../vault/model/VaultModel';
import PveFsmEventId from '../../enum/PveFsmEventId';
import PveSceneState from '../../enum/PveSceneState';
import PveSceneBaseAction from '../base/PveSceneBaseAction';
import { CheckCfg } from './../../../../a/config';
import CopyModel, { CopyType } from './../../../../common/models/CopyModel';


/**
 * Pve??????????????????
 * @Author: sthoo.huang
 * @Date: 2019-03-22 15:42:31
 * @Last Modified by: luoyong
 * @Last Modified time: 2021-08-24 10:00:49
 */
const { property } = cc._decorator;

@gdk.fsm.action("PveSceneOverAction", "Pve/Scene")
export default class PveSceneOverAction extends PveSceneBaseAction {

    get guideModel(): GuideModel { return ModelManager.get(GuideModel); }

    @property({ tooltip: "????????????" })
    isWin: boolean = true;

    temIsWin: boolean = false;
    onEnter() {
        super.onEnter();
        let stageConfig = this.model.stageConfig;

        // ?????????????????????
        this.temIsWin = this.isWin;
        //???????????????????????????
        let win = this.isWin;
        if (this.isWin || stageConfig.copy_id == CopyType.FootHold || stageConfig.copy_id == CopyType.GuildBoss || stageConfig.copy_id == CopyType.HeroTrial || stageConfig.copy_id == CopyType.NewHeroTrial
            || (stageConfig.copy_id == CopyType.NONE && this.model.arenaSyncData.fightType == 'PIECES_CHESS')
            || (stageConfig.copy_id == CopyType.NONE && this.model.arenaSyncData.fightType == 'PIECES_ENDLESS')) {
            // ?????????or??????boss????????????
            win = true;
        }

        if (stageConfig.copy_id == CopyType.Adventure) {
            let advModel = ModelManager.get(AdventureModel)
            if (advModel.difficulty == 4) {
                win = true;
            }
        }
        if (stageConfig.copy_id == CopyType.NewAdventure) {
            let advModel = ModelManager.get(NewAdventureModel)
            if (advModel.copyType == 1) {
                win = true;
            }
        }

        gdk.panel.preload(win ? PanelId.PveSceneWinPanel : PanelId.PveSceneFailPanel);

        // ??????????????????
        this.model.killEnemyDrop = {};

        // ????????????
        let goldWin = true;
        if (stageConfig.copy_id == InstanceID.GOLD_INST) {
            if (this.model.maxEnemy != this.model.killedEnemy) {
                goldWin = false;
            }
        }

        // ???????????????????????????????????????
        if (stageConfig.copy_id == CopyType.Elite) {
            this.model.heros.forEach(hero => {
                hero.model._skills = null;
            });
        }
        //???????????????????????????????????????????????????  
        if (stageConfig.copy_id == CopyType.RookieCup || stageConfig.copy_id == CopyType.EndRuin || stageConfig.copy_id == CopyType.HeroAwakening) {
            //??????????????????
            if (this.model.gateconditionUtil.fightTimeLimmit.length > 0) {
                this.model.gateconditionUtil.fightTimeLimmit.forEach(index => {
                    let data = this.model.gateconditionUtil.DataList[index]
                    data.curData = this.model.realTime;
                    data.state = this.temIsWin ? data.curData <= data.cfg.data1 : false;
                })
            }
            //?????????????????????
            if (this.model.gateconditionUtil.GeneralHpLimit.length > 0) {
                this.model.gateconditionUtil.GeneralHpLimit.forEach(index => {
                    let data = this.model.gateconditionUtil.DataList[index]
                    data.curData = this.temIsWin ? this.model.proteges[0].model.hp : 0;
                    data.state = data.curData >= data.cfg.data1;
                    data.start = true;
                })
            }

            //??????????????????????????????
            if (this.model.gateconditionUtil.heroTypeDamageLimit.length > 0) {
                this.model.gateconditionUtil.heroTypeDamageLimit.forEach(index => {
                    let data = this.model.gateconditionUtil.DataList[index];
                    let heroInfo = this.model.getFightBybaseId(data.cfg.data1)
                    let tem = this.model.battleInfoUtil.getHeroDamage(heroInfo.model.fightId);
                    data.curData = data.cfg.data3 == 0 ? tem.OutputAllDamage : tem.TypeDamageList[data.cfg.data3];
                    data.state = data.curData >= data.cfg.data2;
                    data.start = true;
                })
            }

            if (this.temIsWin) {
                //??????????????????????????????
                let cupNum = this.model.gateconditionUtil.getGateConditionCupNum();
                this.temIsWin = cupNum > 0;
                if (stageConfig.copy_id == CopyType.HeroAwakening) {
                    this.temIsWin = cupNum == 3;
                }
            }

        }

        // ??????????????????
        if (!this.temIsWin && !this.model.isBounty) {
            // ??????????????????????????????
            if (stageConfig.copy_id == CopyType.GOD) {
                let type = stageConfig.copy_id + '';
                let instanceM = ModelManager.get(InstanceModel);
                if (instanceM) {
                    instanceM.instanceFailStage[type] = stageConfig.id;
                }
            }
        }

        // if (this.model.stageConfig.copy_id == CopyType.NONE && this.model.arenaSyncData.fightType == 'FOOTHOLD_GATHER') {
        //     let fhModel = ModelManager.get(FootHoldModel)
        //     if (fhModel.gatherOpponents[fhModel.gatherFightOpponetnsIndex].hp > 0) {
        //         this.isWin = false
        //     } else {
        //         this.isWin = true
        //     }
        // }

        // ????????????????????????
        if (win) {
            this.reqDamageStatic();
        }

        // ????????????
        let isCopy = !(stageConfig.copy_id == CopyType.MAIN || stageConfig.copy_id == CopyType.Elite);
        this.reqExit(isCopy, goldWin);
    }

    // ??????????????????
    reqDamageStatic() {
        let stageConfig = this.model.stageConfig;
        let cfg = ConfigManager.getItem(CheckCfg, c => {
            // ??????????????????
            // 'FOOTHOLD' | 'ARENA' | 'CHAMPION_GUESS' | 'CHAMPION_MATCH' | 'RELIC' | 'VAULT' | 
            // 'ENDRUIN' | 'ARENATEAM' | 'PEAK' | 'FOOTHOLD_GATHER' | 'GUARDIANTOWER' | 'PIECES_CHESS' | 
            // 'PIECES_ENDLESS' | 'ARENAHONOR_GUESS' | 'WORLDHONOR_GUESS';
            if (c.copy_id == stageConfig.copy_id && c.subtype == stageConfig.subtype) {
                if (c.copy_id == CopyType.NONE) {
                    // ????????????
                    if (c.pvp_type == this.model.arenaSyncData.fightType) {
                        return true;
                    }
                } else {
                    // ????????????
                    return true;
                }
            }
            return false;
        });
        if (!cfg) {
            // ??????????????????????????????????????????????????????
            return;
        }
        let req = new icmsg.FightDamageStaticReq();
        req.stageId = stageConfig.id;
        req.opPower = 0;
        if (this.model.arenaSyncData) {
            req.opPower = this.model.arenaSyncData.mirrorModel.totalPower;
        }
        req.fightType = cfg.id;
        // ????????????
        let info = this.model.battleInfoUtil;
        req.damage = [];
        for (let i = 0; i < info.HeroList.length; i++) {
            let hurt = info.BattleInfo[info.HeroList[i]];
            if (hurt) {
                let e = new icmsg.FightHeroDamage();
                this.model.heros.some(h => {
                    if (h.model.id == hurt.baseId) {
                        e.heroId = h.model.heroId;
                        return true;
                    }
                    return false;
                });
                e.atkDmg = hurt.OutputAllDamage;
                e.atkTimes = hurt.OutputSkillDamageNum + hurt.OutputNormalDamageNum;
                e.stkDmg = hurt.SufferAllDamage;
                e.stkTimes = hurt.SufferSkillDamageNum + hurt.SufferNormalDamageNum;
                req.damage.push(e);
            }
        }
        req.bossNum = info.BossNum;
        NetManager.send(req);
    }

    // ??????????????????
    reqExit(isCopy: boolean, goldWin: boolean) {
        gdk.gui.showWaiting('', "PveSceneOver", 0, null, null, 2);

        // ??????????????????
        ErrorManager.on([3312, 3608, 3704, 1907, 5104, 5115, 5106, 5105, 5117, 6915], () => {
            if (!this.active) return;
            if (!this.ctrl) return;
            // ???????????????????????????????????????
            this.ctrl.close(-1);
        }, this);

        let model = this.model;
        if (model.stageConfig.copy_id == CopyType.GuildBoss) {
            //??????boss??????
            let gModel = ModelManager.get(GuildModel);
            if (!gModel.gbMaxHurt || model.guildBossHurt > gModel.gbMaxHurt) {
                gModel.gbMaxHurt = model.guildBossHurt;
            }
            let req = new icmsg.GuildBossExitReq();
            req.blood = model.guildBossHurt;
            NetManager.send(req, (resp: icmsg.GuildBossExitRsp) => {
                if (!this.model) return;
                if (!this.active) return;
                this.reqExitRsp(resp);
            });
        } else if (model.stageConfig.copy_id == CopyType.FootHold) {
            // ?????????????????????
            let fhModle = ModelManager.get(FootHoldModel);
            let msg = new icmsg.FootholdFightOverReq();
            msg.warId = fhModle.curMapData.warId;
            msg.pos = fhModle.pointDetailInfo.pos;
            // ???boss????????????
            if (this.temIsWin) {
                msg.bossDmg = fhModle.pointDetailInfo.bossHp;
            } else {
                msg.bossDmg = model.footholdBossHurt;
            }
            fhModle.curBossHurt = msg.bossDmg;
            NetManager.send(msg, (data: icmsg.FootholdFightOverRsp) => {
                fhModle.energy = data.energy;
                fhModle.isPvp = false;
                fhModle.fightPoint = null;
                if (!this.model) return;
                if (!this.active) return;
                this.reqExitRsp(data);
            }, this);
        } else if (model.stageConfig.copy_id == CopyType.Expedition) {
            //??????????????????
            let eModel = ModelManager.get(ExpeditionModel)
            let msg = new icmsg.ExpeditionFightOverReq()
            msg.isClear = this.temIsWin
            msg.grids = eModel.curHeroGirds
            NetManager.send(msg, (data: icmsg.ExpeditionFightOverRsp) => {
                if (!this.model) return;
                if (!this.active) return;
                this.reqExitRsp(data);
            });
        } else if (model.stageConfig.copy_id == CopyType.Eternal) {
            // ??????????????????
            let msg = new icmsg.MartialSoulExitReq();
            msg.stageId = model.id;
            msg.clear = this.temIsWin;
            //??????????????????????????????
            if (this.temIsWin) {
                if (model.minPower <= 0 || model.totalPower < model.minPower) {
                    // ??????????????????????????????????????????????????????
                    try {
                        // ????????????????????????
                        let heroes = [];
                        let data = {
                            h: [-1, -1, -1, -1, -1, -1],   // ???????????????[heroId, ... ]
                            a: model.actions,    // ??????????????????[[time, skill_id, pos_x, pos_y]]    
                            e: model.enemyBorns,   // ????????????
                        };
                        for (let i = 0, n = model.towers.length; i < n; i++) {
                            let t = model.towers[i];
                            if (t.hero) {
                                let m = t.hero.model;
                                if (m.item && m.item.series > 0) {
                                    // ??????????????????????????????????????????
                                    heroes.push(m.heroId);
                                    data.h[t.id - 1] = m.heroId;
                                }
                            }
                        }
                        msg.heroes = heroes;   // ????????????????????????
                        msg.rndseed = model.seed; // ????????????????????????
                        let str: any = gdk.amf.encodeObject(data);
                        str = gdk.pako.gzip(str);
                        str = gdk.Buffer.from(str).toString('binary');
                        msg.actions = str;  // ????????????????????????
                    } catch (e) { }
                }
            } else {
                msg.heroes = [];   // ????????????????????????
                msg.rndseed = 0;   // ????????????????????????
                msg.actions = '';  // ?????????????????????????????????
            }
            NetManager.send(msg, (data: icmsg.MartialSoulExitRsp) => {
                if (!this.model) return;
                if (!this.active) return;
                this.reqExitRsp(data);
            }, this);
        } else if (model.stageConfig.copy_id == CopyType.DoomsDay) {
            // ??????????????????
            let msg = new icmsg.DoomsDayExitReq();
            msg.stageId = model.id;
            msg.clear = this.temIsWin;
            NetManager.send(msg, (data: icmsg.DoomsDayExitRsp) => {
                if (!this.model) return;
                if (!this.active) return;
                this.reqExitRsp(data);
            }, this);
        } else if (model.stageConfig.copy_id == CopyType.Guardian) {
            let msg = new icmsg.GuardianCopyExitReq();
            msg.stageId = model.id;
            msg.clear = this.temIsWin;
            NetManager.send(msg, (data: icmsg.DungeonHeroExitRsp) => {
                if (!this.model) return;
                if (!this.active) return;
                this.reqExitRsp(data);
            }, this);
        }
        else if (model.stageConfig.copy_id == CopyType.SevenDayWar) {
            let msg = new icmsg.DungeonSevenDayExitReq()
            msg.stageId = model.id;
            msg.clear = this.temIsWin;
            NetManager.send(msg, (data: icmsg.DungeonSevenDayExitRsp) => {
                if (!this.model) return;
                if (!this.active) return;
                this.reqExitRsp(data);
            }, this);
        }
        else if (model.stageConfig.copy_id == CopyType.Mine) {
            // ????????????
            let msg = new icmsg.ActivityCaveExitReq();
            msg.stageId = model.id;
            msg.clear = this.temIsWin;
            NetManager.send(msg, (data: icmsg.ActivityCaveExitRsp) => {
                if (!this.model) return;
                if (!this.active) return;
                this.reqExitRsp(data);
            }, this);
        } else if (model.stageConfig.copy_id == CopyType.HeroAwakening) {
            // ??????????????????
            let copyModel = ModelManager.get(CopyModel);
            let msg = new icmsg.HeroAwakeExitReq();
            msg.stageId = model.id;
            msg.heroId = copyModel.heroAwakeHeroId;
            msg.clear = this.temIsWin;
            NetManager.send(msg, (data: icmsg.HeroAwakeExitRsp) => {
                if (!this.model) return;
                if (!this.active) return;
                this.reqExitRsp(data);
            }, this);
        } else if (model.stageConfig.copy_id == CopyType.GOD) {
            // ????????????
            let msg = new icmsg.DungeonHeroExitReq();
            msg.stageId = model.id;
            msg.clear = this.temIsWin;
            NetManager.send(msg, (data: icmsg.DungeonHeroExitRsp) => {
                if (!this.model) return;
                if (!this.active) return;
                if (this.temIsWin) {
                    let model = ModelManager.get(InstanceModel);
                    let index = model.heroCopyCurIndex >= 0 ? model.heroCopyCurIndex : -1;
                    if (index < 0) {
                        let tem = { '9': 0, '10': 1, '11': 2 }
                        let cfg = ConfigManager.getItemById(Copy_stageCfg, data.stageId);
                        index = tem['' + cfg.subtype]
                    }
                    model.heroCopyPassStageIDs[index] = data.stageId;
                }

                this.reqExitRsp(data);
            }, this);
        } else if (model.stageConfig.copy_id == CopyType.Rune) {
            // ????????????
            let msg = new icmsg.DungeonRuneExitReq();
            msg.stageId = model.id;
            msg.monsters = this.model.RuneMonsters;
            msg.clear = this.model.killedEnemy >= this.model.stageConfig.monsters;//this.isWin;
            NetManager.send(msg, (data: icmsg.DungeonRuneExitRsp) => {
                if (!this.model) return;
                if (!this.active) return;
                let model = ModelManager.get(InstanceModel);
                if (data.monsterNum > model.runeInfo.maxMonsterNum && model.runeInfo.maxMonsterNum > 0) {
                    model.runeMonsterAdd = data.monsterNum - model.runeInfo.maxMonsterNum;
                    model.runeInfo.maxMonsterNum = data.monsterNum
                } else {
                    model.runeMonsterAdd = 0;
                }
                this.reqExitRsp(data);
            }, this);
        } else if (model.stageConfig.copy_id == CopyType.HeroTrial) {
            // ????????????
            let msg = new icmsg.DungeonOrdealExitReq();
            msg.stageId = model.id;
            //??????????????????????????????????????????
            model.enemies.forEach(enemy => {
                let enemyModel = enemy.model
                if ((!enemyModel.owner_id || enemyModel.owner_id <= 0) && enemyModel.config.type != 4) {
                    model.allEnemyHurtNum += Math.max(0, enemyModel.hpMax - enemyModel.hp);
                }
            })
            msg.stageDamage = Math.min(model.stageAllEnemyHpNum, model.allEnemyHurtNum);//this.model.RuneMonsters;
            let state = model.config.endless ? false : model.stageAllEnemyHpNum <= model.allEnemyHurtNum;
            msg.clear = state//this.isWin;
            NetManager.send(msg, (data: icmsg.DungeonOrdealExitRsp) => {
                if (!this.model) return;
                if (!this.active) return;
                // let model = ModelManager.get(InstanceModel);
                // if (data.monsterNum > model.runeInfo.maxMonsterNum && model.runeInfo.maxMonsterNum > 0) {
                //     model.runeMonsterAdd = data.monsterNum - model.runeInfo.maxMonsterNum;
                //     model.runeInfo.maxMonsterNum = data.monsterNum
                // } else {
                //     model.runeMonsterAdd = 0;
                // }
                this.reqExitRsp(data);
            }, this);
        } else if (model.stageConfig.copy_id == CopyType.NewHeroTrial) {
            // ????????????
            let msg = new icmsg.NewOrdealExitReq();
            msg.stageId = model.id;
            //??????????????????????????????????????????
            model.enemies.forEach(enemy => {
                let enemyModel = enemy.model
                if ((!enemyModel.owner_id || enemyModel.owner_id <= 0) && enemyModel.config.type != 4) {
                    model.allEnemyHurtNum += Math.max(0, enemyModel.hpMax - enemyModel.hp);
                }
            })
            msg.stageDamage = Math.min(model.stageAllEnemyHpNum, model.allEnemyHurtNum);//this.model.RuneMonsters;
            let state = model.config.endless ? false : model.stageAllEnemyHpNum <= model.allEnemyHurtNum;
            msg.clear = state//this.isWin;
            NetManager.send(msg, (data: icmsg.NewOrdealExitRsp) => {
                if (!this.model) return;
                if (!this.active) return;
                // let model = ModelManager.get(InstanceModel);
                // if (data.monsterNum > model.runeInfo.maxMonsterNum && model.runeInfo.maxMonsterNum > 0) {
                //     model.runeMonsterAdd = data.monsterNum - model.runeInfo.maxMonsterNum;
                //     model.runeInfo.maxMonsterNum = data.monsterNum
                // } else {
                //     model.runeMonsterAdd = 0;
                // }
                this.reqExitRsp(data);
            }, this);
        } else if (model.stageConfig.copy_id == CopyType.EndRuin) {
            // ??????????????????
            let msg = new icmsg.RuinExitReq();
            msg.stageId = model.id;
            let starNum = 0;
            //let tem = model.gateconditionUtil.getGateConditionCupNum()
            // for (let i = 0; i < tem; i++) {
            //     starNum |= 1 << i;
            // }
            if (!this.temIsWin) {
                starNum = 0;
            } else {
                model.gateconditionUtil.DataList.forEach((data, i) => {
                    if (data.start && data.state) {
                        starNum |= 1 << i;
                    }
                })
            }
            msg.star = starNum;

            NetManager.send(msg, (data: icmsg.RuinExitRsp) => {
                if (!this.model) return;
                if (!this.active) return;
                this.reqExitRsp(data);
            }, this);
        } else if (model.stageConfig.copy_id == CopyType.NONE && model.arenaSyncData.fightType == 'ARENA') {
            // ?????????
            let qmsg = new icmsg.ArenaFightResultReq();
            qmsg.heroIds = [];
            model.towers.forEach(t => {
                let idx = t.id - 1;
                qmsg.heroIds[idx] = t.hero ? t.hero.model.heroId : -1;
            });
            qmsg.opponentId = model.arenaSyncData.args[0];
            qmsg.success = this.temIsWin;
            NetManager.send(qmsg, (rmsg: icmsg.ArenaFightResultRsp) => {
                // ????????????
                if (!cc.isValid(this.node)) return;
                this.reqExitRsp(rmsg);
            }, this);
        } else if (model.stageConfig.copy_id == CopyType.NONE && model.arenaSyncData.fightType == 'FOOTHOLD') {
            let fhModle = ModelManager.get(FootHoldModel);
            // ??????????????????????????????
            let qmsg = new icmsg.FootholdFightOverReq();
            qmsg.warId = model.arenaSyncData.args[0];
            qmsg.pos = model.arenaSyncData.args[1];
            qmsg.bossDmg = 0;
            qmsg.playerDmg = this.temIsWin ? fhModle.pointDetailInfo.bossHp : model.wave - 1;
            NetManager.send(qmsg, (rmsg: icmsg.FootholdFightOverRsp) => {
                // ????????????
                if (!cc.isValid(this.node)) return;
                fhModle.energy = rmsg.energy;
                fhModle.isPvp = true;
                fhModle.fightPoint = null;
                fhModle.isPvpWin = this.temIsWin
                fhModle.pvpPlayerDmg = qmsg.playerDmg
                this.reqExitRsp(rmsg);
            }, this);
        } else if (model.stageConfig.copy_id == CopyType.NONE && model.arenaSyncData.fightType == 'RELIC') {
            let relicM = ModelManager.get(RelicModel);
            // ????????????????????????
            let qmsg = new icmsg.RelicFightOverReq();
            qmsg.mapType = parseInt(relicM.curAtkCity.split('-')[0]);
            qmsg.pointId = parseInt(relicM.curAtkCity.split('-')[1]);
            qmsg.damage = this.temIsWin ? 999 : model.wave - 1;
            NetManager.send(qmsg, (rmsg: icmsg.RelicFightOverRsp) => {
                // ????????????
                if (!cc.isValid(this.node)) return;
                this.reqExitRsp(rmsg);
            }, this);
        } else if (model.stageConfig.copy_id == CopyType.NONE && model.arenaSyncData.fightType == 'VAULT') {
            let vaultModel = ModelManager.get(VaultModel);
            // ????????????????????????
            let qmsg = new icmsg.VaultFightOverReq();
            qmsg.isSuccess = this.temIsWin;
            qmsg.positionId = vaultModel.curPos + 1;
            // qmsg.pointId = parseInt(relicM.curAtkCity.split('-')[1]);
            // qmsg.damage = this.isWin ? 999 : model.wave - 1;
            NetManager.send(qmsg, (rmsg: icmsg.VaultFightOverRsp) => {
                // ????????????
                if (!cc.isValid(this.node)) return;
                this.reqExitRsp(rmsg);
            }, this);
        } else if (model.stageConfig.copy_id == CopyType.NONE && model.arenaSyncData.fightType == 'CHAMPION_GUESS') {
            let cM = ModelManager.get(ChampionModel);
            // ???????????????????????????
            let qmsg = new icmsg.ChampionGuessFightResultReq();
            qmsg.index = cM.guessIndex;
            qmsg.playerId = this.temIsWin ? this.model.championGuessFightInfos[0].playerId : this.model.championGuessFightInfos[1].playerId;
            NetManager.send(qmsg, (rmsg: icmsg.ChampionGuessFightResultRsp) => {
                // ????????????
                if (!cc.isValid(this.node)) return;
                cM.guessList[cM.guessIndex].rewardScore = rmsg.score;
                this.reqExitRsp(rmsg);
            }, this);
        } else if (model.stageConfig.copy_id == CopyType.NONE && model.arenaSyncData.fightType == 'CHAMPION_MATCH') {
            let cM = ModelManager.get(ChampionModel);
            // ???????????????????????????
            let qmsg = new icmsg.ChampionFightOverReq();
            qmsg.isWin = this.temIsWin;
            NetManager.send(qmsg, (rmsg: icmsg.ChampionFightOverRsp) => {
                // ????????????
                if (!cc.isValid(this.node)) return;
                this.reqExitRsp(rmsg);
            }, this);
            //this.reqExitRsp(new ChampionFightOverRsp({ score: 100 }));
        } else if (model.stageConfig.copy_id == CopyType.NONE && model.arenaSyncData.fightType == 'ENDRUIN') {
            let copyModel = ModelManager.get(CopyModel);
            // ????????????PVP????????????
            let qmsg = new icmsg.RuinChallengeExitReq();
            qmsg.chapter = copyModel.endRuinPvpChapterInfo.chapter
            qmsg.clear = this.temIsWin;
            NetManager.send(qmsg, (rmsg: icmsg.RuinChallengeExitRsp) => {
                // ????????????
                if (!cc.isValid(this.node)) return;
                this.reqExitRsp(rmsg);
            }, this);
            //this.reqExitRsp(new ChampionFightOverRsp({ score: 100 }));
        } else if (model.stageConfig.copy_id == CopyType.NONE && model.arenaSyncData.fightType == 'ARENATEAM') {
            let atM = ModelManager.get(ArenaTeamViewModel);
            // ???????????????
            let qmsg = new icmsg.ArenaTeamFightOverReq();
            qmsg.index = atM.fightNum//matchInfo.fightedNum;
            qmsg.isWin = this.temIsWin;
            NetManager.send(qmsg, (rmsg: icmsg.ArenaTeamFightOverRsp) => {
                // ????????????
                if (!cc.isValid(this.node)) return;
                //
                if (rmsg.results.length == 0) {
                    atM.attackWinList[atM.fightNum] = this.temIsWin ? 2 : 1;
                    atM.fightNum += 1;
                    let m2 = this.model.arenaSyncData.mirrorModel;
                    //m2.state = PveSceneState.Ready
                    let id = this.model.id
                    this.model.id = id;
                    this.model.arenaSyncData.waveTimeOut = 1;
                    this.model.arenaSyncData.bossId = 1;
                    this.model.arenaSyncData.bossTimeOut = ConfigManager.getItemById(Pve_bossbornCfg, 1).interval;

                    m2.ctrl.fsm.broadcastEvent(PveFsmEventId.PVE_SCENE_REINIT);
                    this.ctrl.fsm.broadcastEvent(PveFsmEventId.PVE_SCENE_REINIT);
                    return;
                } else {
                    atM.AttackEnterView = 0;
                    this.reqExitRsp(rmsg);
                }

            }, this);
            //this.reqExitRsp(new ChampionFightOverRsp({ score: 100 }));
        } else if (model.stageConfig.copy_id == CopyType.NONE && model.arenaSyncData.fightType == 'ROYAL') {
            let rM = ModelManager.get(RoyalModel);
            // ???????????????
            let qmsg = new icmsg.RoyalFightOverReq();
            qmsg.round = rM.curFightNum + 1//matchInfo.fightedNum;
            qmsg.isWin = this.temIsWin;
            NetManager.send(qmsg, (rmsg: icmsg.RoyalFightOverRsp) => {
                // ????????????
                if (!cc.isValid(this.node)) return;
                //
                rM.attackWinList[rM.curFightNum] = this.temIsWin ? 2 : 1;
                //??????????????????????????????
                let winNum: number = 0;
                let lossNum: number = 0;
                rM.attackWinList.forEach(data => {
                    if (data == 1) {
                        lossNum++;
                    } else if (data == 2) {
                        winNum++;
                    }
                })
                this.reqExitRsp(rmsg);
                // if (lossNum >= 2 || winNum >= 2) {
                //     this.reqExitRsp(rmsg);
                //     rM.clearFightData();
                // }else {
                //     rM.curFightNum += 1;
                //     rM.addSkillId = 0;
                //     let m2 = this.model.arenaSyncData.mirrorModel;
                //     //m2.state = PveSceneState.Ready
                //     let sceneId = rM.playerData.maps[rM.curFightNum];
                //     let cfg = ConfigManager.getItemByField(Royal_sceneCfg, 'id', sceneId);
                //     rM.winElite = {};
                //     cfg.victory.forEach(data => {
                //         switch (data[0]) {
                //             case 1:
                //             case 2:
                //             case 3:
                //                 rM.winElite[data[0]] = data[1];
                //                 break
                //             case 4:
                //             case 5:
                //                 rM.winElite[data[0]] = true;
                //                 break;
                //             case 6:
                //                 rM.winElite[data[0]] = [data[1], data[2]];
                //         }
                //     })
                //     let nextStageId = cfg.stage_id
                //     let id = nextStageId;
                //     this.model.id = id;
                //     this.model.arenaSyncData.waveTimeOut = 1;
                //     this.model.arenaSyncData.bossId = 1;
                //     this.model.arenaSyncData.bossTimeOut = -1//ConfigManager.getItemById(Pve_bossbornCfg, 1).interval;
                //     m2.id = id + 1;
                //     m2.ctrl.fsm.broadcastEvent(PveFsmEventId.PVE_SCENE_REINIT);
                //     this.ctrl.fsm.broadcastEvent(PveFsmEventId.PVE_SCENE_REINIT);
                //     return;
                // }

            }, this);
            //this.reqExitRsp(new ChampionFightOverRsp({ score: 100 }));
        } else if (model.stageConfig.copy_id == CopyType.NONE && model.arenaSyncData.fightType == 'ROYAL_TEST') {
            let rM = ModelManager.get(RoyalModel);
            let rmsg = new icmsg.RoyalFightOverRsp()
            rmsg.isWin = this.temIsWin;
            rmsg.newDiv = rM.division
            rmsg.newRank = rM.rank;
            rmsg.newScore = rM.score;
            this.reqExitRsp(rmsg);

        } else if (model.stageConfig.copy_id == CopyType.NONE && model.arenaSyncData.fightType == 'FOOTHOLD_GATHER') {
            //??????????????????
            let fhModel = ModelManager.get(FootHoldModel);
            let opponentsIndex = fhModel.gatherFightOpponetnsIndex
            let fightValue: icmsg.FootholdGatherFightValue = new icmsg.FootholdGatherFightValue()

            if (this.temIsWin) {
                fightValue.playerId = fhModel.gatherOpponents[opponentsIndex].id
                fightValue.value = fhModel.gatherOpponents[opponentsIndex].hp
                fhModel.gatherFightTeamMatesIndex++
                fhModel.gatherFightOpponetnsIndex++
            } else {
                let remainHp = fhModel.gatherOpponents[opponentsIndex].hp
                fhModel.gatherOpponents[opponentsIndex].hp = (remainHp - (model.wave - 1)) > 0 ? (remainHp - (model.wave - 1)) : 0
                fightValue.playerId = fhModel.gatherOpponents[opponentsIndex].id
                fightValue.value = model.wave - 1
                fhModel.gatherFightTeamMatesIndex++
            }

            let qmsg = new icmsg.FootholdGatherFightOverReq();
            qmsg.index = fhModel.gatherFightTeamMatesIndex - 1
            qmsg.pos = fhModel.pointDetailInfo.pos
            qmsg.typ = fhModel.gatherFightType
            qmsg.damage = fightValue
            NetManager.send(qmsg, (rmsg: icmsg.FootholdGatherFightOverRsp) => {
                // ????????????
                if (!cc.isValid(this.node)) return;
                fhModel.energy = rmsg.energy;
                fhModel.fightPoint = null;
                if (rmsg.newHPs.length == 0) {
                    let m2 = this.model.arenaSyncData.mirrorModel;
                    let id = this.model.id
                    this.model.id = id;
                    this.model.arenaSyncData.waveTimeOut = 1;
                    this.model.arenaSyncData.bossId = 1;
                    this.model.arenaSyncData.bossTimeOut = ConfigManager.getItemById(Pve_bossbornCfg, 1).interval;

                    let opponentInfo = fhModel.gatherOpponents[fhModel.gatherFightOpponetnsIndex]
                    let o_player = new icmsg.ArenaPlayer()
                    o_player.name = opponentInfo.name
                    o_player.head = opponentInfo.head
                    o_player.frame = opponentInfo.frame
                    let power = 0
                    opponentInfo.heroList.forEach(element => {
                        power += element.heroPower
                    })
                    o_player.power = power
                    m2.arenaSyncData.args = [0, 0, o_player]
                    this.model.refreshArenaInfo = true
                    this.ctrl.fsm.broadcastEvent(PveFsmEventId.PVE_SCENE_NEXT)
                    return
                } else {
                    this.reqExitRsp(rmsg);
                }
            }, this)
        } else if (model.stageConfig.copy_id == CopyType.NONE && model.arenaSyncData.fightType == 'PEAK') {
            let peakModel = ModelManager.get(PeakModel);
            // ????????????
            let qmsg = new icmsg.PeakExitReq();
            qmsg.clear = this.temIsWin;
            NetManager.send(qmsg, (rmsg: icmsg.PeakExitRsp) => {
                // ????????????
                if (!cc.isValid(this.node)) return;
                this.reqExitRsp(rmsg);
            }, this);
        } else if (model.stageConfig.copy_id == CopyType.NONE && model.arenaSyncData.fightType == 'GUARDIANTOWER') {
            let gtModel = ModelManager.get(GuardianTowerModel);
            // ????????????
            let qmsg = new icmsg.GuardianTowerExitReq();
            qmsg.stageId = gtModel.curCfg.id
            qmsg.clear = this.temIsWin;
            NetManager.send(qmsg, (rmsg: icmsg.GuardianTowerExitRsp) => {
                // ????????????
                if (!cc.isValid(this.node)) return;
                this.reqExitRsp(rmsg);
            }, this);
        } else if (model.stageConfig.copy_id == CopyType.NONE && model.arenaSyncData.fightType == 'ARENAHONOR_GUESS') {
            let aM = ModelManager.get(ArenaHonorModel);
            let rM = ModelManager.get(RoleModel);
            // ???????????????????????????
            let qmsg = new icmsg.ArenaHonorExitReq();
            qmsg.world = false;
            qmsg.group = aM.guessInfo.group;
            qmsg.match = aM.guessInfo.match;
            let winNum = this.temIsWin ? 1 : 2;
            if (rM.id == aM.guessInfo.players[1].id) {
                winNum = this.temIsWin ? 2 : 1;
            }
            qmsg.winner = winNum
            NetManager.send(qmsg, (rmsg: icmsg.ArenaHonorExitRsp) => {
                // ????????????
                if (!cc.isValid(this.node)) return;
                //cM.guessList[cM.guessIndex].rewardScore = rmsg.score;
                aM.guessInfo.guess = rmsg.guess;
                aM.guessInfo.guessWinner = rmsg.winner;
                let tem = aM.guessInfo.players[rmsg.winner - 1].win + 1
                aM.guessInfo.players[rmsg.winner - 1].win = tem;
                aM.list.forEach(data => {
                    if (data.group == rmsg.group && data.match == rmsg.match) {
                        data.guess = rmsg.guess;
                        data.guessWinner = rmsg.winner;
                        data.players[rmsg.winner - 1].win = tem;
                    }
                })
                this.reqExitRsp(rmsg);
            }, this);
        } else if (model.stageConfig.copy_id == CopyType.NONE && model.arenaSyncData.fightType == 'WORLDHONOR_GUESS') {
            let aM = ModelManager.get(WorldHonorModel);
            let rM = ModelManager.get(RoleModel);
            // ???????????????????????????
            let qmsg = new icmsg.ArenaHonorExitReq();
            qmsg.world = true;
            qmsg.group = aM.guessInfo.group;
            qmsg.match = aM.guessInfo.match;
            let winNum = this.temIsWin ? 1 : 2;
            if (rM.id == aM.guessInfo.players[1].id) {
                winNum = this.temIsWin ? 2 : 1;
            }
            qmsg.winner = winNum
            NetManager.send(qmsg, (rmsg: icmsg.ArenaHonorExitRsp) => {
                // ????????????
                if (!cc.isValid(this.node)) return;
                //cM.guessList[cM.guessIndex].rewardScore = rmsg.score;
                aM.guessInfo.guess = rmsg.guess;
                aM.guessInfo.guessWinner = rmsg.winner;
                let tem = aM.guessInfo.players[rmsg.winner - 1].win + 1
                aM.guessInfo.players[rmsg.winner - 1].win = tem;
                aM.list.forEach(data => {
                    if (data.group == rmsg.group && data.match == rmsg.match) {
                        data.guess = rmsg.guess;
                        data.guessWinner = rmsg.winner;
                        data.players[rmsg.winner - 1].win = tem;
                    }
                })
                this.reqExitRsp(rmsg);
            }, this);
        } else if (model.isBounty) {
            // ????????????
            let qmsg = new icmsg.BountyFightOverReq();
            qmsg.missionId = model.bountyMission.missionId;
            qmsg.clear = this.temIsWin;
            //????????????????????????
            if (this.temIsWin) {
                try {
                    // ????????????????????????
                    let heroes = [];
                    let data = {
                        h: [-1, -1, -1, -1, -1, -1],   // ???????????????[heroId, ... ]
                        a: model.actions,    // ??????????????????[[time, skill_id, pos_x, pos_y]]    
                        e: model.enemyBorns,   // ????????????
                    };
                    for (let i = 0, n = model.towers.length; i < n; i++) {
                        let t = model.towers[i];
                        if (t.hero) {
                            let m = t.hero.model;
                            if (m.item && m.item.series > 0) {
                                // ??????????????????????????????????????????
                                heroes.push(m.item.itemId);
                                data.h[t.id - 1] = m.item.itemId;
                            }
                        }
                    }
                    qmsg.heroIds = heroes;   // ????????????????????????
                    qmsg.rndSeed = model.seed; // ????????????????????????
                    let str: any = gdk.amf.encodeObject(data);
                    str = gdk.pako.gzip(str);
                    str = gdk.Buffer.from(str).toString('binary');
                    qmsg.actions = str;  // ????????????????????????
                } catch (e) { }

            } else {
                qmsg.heroIds = [];   // ????????????????????????
                qmsg.rndSeed = 0;   // ????????????????????????
                qmsg.actions = '';  // ?????????????????????????????????
            }

            NetManager.send(qmsg, (data: icmsg.BountyFightOverRsp) => {
                if (!this.model) return;
                if (!this.active) return;
                this.reqExitRsp(data);
            }, this);
        } else if (model.stageConfig.copy_id == CopyType.Adventure) {
            //??????  //????????????
            let str = ''
            if (!this.temIsWin) {
                let dic: any = gdk.amf.encodeObject({
                    m: this.model.killedEnemyDic,
                    a: this.model.wave,//????????????
                    b: this.model.killedEnemy,
                });
                dic = gdk.pako.gzip(dic);
                str = gdk.Buffer.from(dic).toString('binary');
            }
            let advModel = ModelManager.get(AdventureModel)

            if (this.temIsWin && advModel.layerId == 3) {
                let len = ConfigManager.getItems(AdventureCfg, { difficulty: advModel.difficulty, layer_id: advModel.layerId }).length
                if (advModel.selectIndex == len - 1) {
                    advModel.isShowFinishTip = true
                }
            }

            let qmsg = new icmsg.AdventureExitReq()
            qmsg.plateIndex = advModel.selectIndex
            qmsg.blood = this.model.proteges[0].model.hp
            qmsg.group = this.model.realWave//????????????
            qmsg.fightState = str
            NetManager.send(qmsg, (data: icmsg.AdventureExitRsp) => {
                if (!this.model) return;
                if (!this.active) return;
                this.reqExitRsp(data);
            }, this);
        } else if (model.stageConfig.copy_id == CopyType.NewAdventure) {
            //??????  //????????????
            let str = ''
            if (!this.temIsWin) {
                let dic: any = gdk.amf.encodeObject({
                    m: this.model.killedEnemyDic,
                    a: this.model.wave,//????????????
                    b: this.model.killedEnemy,
                });
                dic = gdk.pako.gzip(dic);
                str = gdk.Buffer.from(dic).toString('binary');
            }
            let advModel = ModelManager.get(NewAdventureModel)

            let selectIndex = advModel.copyType == 0 ? advModel.normal_selectIndex : advModel.endless_selectIndex;
            let difficulty = advModel.copyType == 0 ? advModel.difficulty : 4;
            let qmsg = new icmsg.Adventure2ExitReq()
            qmsg.difficulty = difficulty
            qmsg.plateIndex = selectIndex
            qmsg.blood = this.model.proteges[0].model.hp
            qmsg.group = this.model.realWave//????????????
            qmsg.fightState = str
            NetManager.send(qmsg, (data: icmsg.Adventure2ExitRsp) => {
                if (!this.model) return;
                if (!this.active) return;
                this.reqExitRsp(data);
                if (this.temIsWin && advModel.copyType == 0) {
                    let len = ConfigManager.getItems(Adventure2_adventureCfg, { difficulty: advModel.difficulty, layer_id: advModel.normal_layerId }).length
                    if (advModel.normal_selectIndex == len - 1) {
                        advModel.isShowFinishTip = true;
                        advModel.firstShowPushView = true;
                        NetManager.send(new icmsg.StorePushListReq());
                    }
                }
            }, this);
        } else if (model.stageConfig.copy_id == CopyType.Siege) {
            //????????????
            let siegeModel = ModelManager.get(SiegeModel)
            let roundMap = siegeModel.roundMap
            let monsters: icmsg.Monster[] = []
            let realDmg = 0//???????????????????????? (?????????????????????????????????)
            let allKillMap = {}
            let killNum = 0
            for (let key in roundMap) {
                let wave = parseInt(key)//??????
                let m_bornCfg = ConfigManager.getItemById(Pve_mainCfg, model.stageConfig.born)
                if (wave == this.model.wave) {
                    let totalHp = 0
                    // ????????????
                    for (let i = 0, n = m_bornCfg.monster_born_cfg.length; i < n; i++) {
                        let item: any = m_bornCfg.monster_born_cfg[i];
                        if (cc.js.isString(item)) {
                            // ????????????????????????????????????
                            let a = item.split('-');
                            let b = parseInt(a[0]);
                            let e = a[1] ? parseInt(a[1]) : b;
                            for (let id = b; id <= e; id++) {
                                let cfg = ConfigManager.getItemById(Pve_bornCfg, id);
                                if (cfg.wave == this.model.wave && cfg && cfg.num > 0) {
                                    let m_cfg = ConfigManager.getItemById(MonsterCfg, cfg.enemy_id)
                                    if (m_cfg) {
                                        totalHp += m_cfg.hp * cfg.num
                                    }
                                }
                            }
                        } else {
                            let cfg = ConfigManager.getItemById(Pve_bornCfg, item);
                            if (cfg.wave == this.model.wave && cfg && cfg.num > 0) {
                                let m_cfg = ConfigManager.getItemById(MonsterCfg, cfg.enemy_id)
                                if (m_cfg) {
                                    totalHp += m_cfg.hp * cfg.num
                                }
                            }
                        }
                    }
                    let killHp = 0
                    let killDic = this.model.killedEnemyDic
                    for (let key in killDic) {
                        let id = parseInt(key)
                        let m_cfg = ConfigManager.getItemById(MonsterCfg, id)
                        if (m_cfg) {
                            killHp += m_cfg.hp * killDic[key]
                            if (!allKillMap[id]) {
                                allKillMap[id] = killDic[key]
                            } else {
                                allKillMap[id] += killDic[key]
                            }
                            killNum += killDic[key]
                        }
                    }
                    let percent = killHp / totalHp
                    realDmg += Math.floor(roundMap[wave] * percent)
                } else if (wave < this.model.wave) {
                    realDmg += roundMap[wave]
                    //??????????????????????????????
                    for (let i = 0, n = m_bornCfg.monster_born_cfg.length; i < n; i++) {
                        let item: any = m_bornCfg.monster_born_cfg[i];
                        if (cc.js.isString(item)) {
                            // ????????????????????????????????????
                            let a = item.split('-');
                            let b = parseInt(a[0]);
                            let e = a[1] ? parseInt(a[1]) : b;
                            for (let id = b; id <= e; id++) {
                                let cfg = ConfigManager.getItemById(Pve_bornCfg, id);
                                if (cfg.wave == wave && cfg && cfg.num > 0) {
                                    let m_cfg = ConfigManager.getItemById(MonsterCfg, cfg.enemy_id)
                                    if (m_cfg) {
                                        if (!allKillMap[cfg.enemy_id]) {
                                            allKillMap[cfg.enemy_id] = cfg.num
                                        } else {
                                            allKillMap[cfg.enemy_id] += cfg.num
                                        }
                                        killNum += cfg.num
                                    }
                                }
                            }
                        } else {
                            let cfg = ConfigManager.getItemById(Pve_bornCfg, item);
                            if (cfg.wave == wave && cfg && cfg.num > 0) {
                                let m_cfg = ConfigManager.getItemById(MonsterCfg, cfg.enemy_id)
                                if (m_cfg) {
                                    if (!allKillMap[cfg.enemy_id]) {
                                        allKillMap[cfg.enemy_id] = cfg.num
                                    } else {
                                        allKillMap[cfg.enemy_id] += cfg.num
                                    }
                                    killNum += cfg.num
                                }
                            }
                        }
                    }
                }
            }
            for (let key in allKillMap) {
                let m = new icmsg.Monster()
                m.monsterId = parseInt(key)
                m.monsterNum = allKillMap[key]
                monsters.push(m)
            }
            let qmsg = new icmsg.SiegeExitReq()
            qmsg.group = this.model.wave
            qmsg.blood = realDmg
            qmsg.monsters = monsters
            NetManager.send(qmsg, (data: icmsg.SiegeExitRsp) => {
                if (!this.model) return;
                if (!this.active) return;
                siegeModel.curWave = this.model.wave
                siegeModel.curDmg = realDmg
                siegeModel.curKillNum = killNum
                this.reqExitRsp(data);
            }, this);
        } else if (model.stageConfig.copy_id == CopyType.Ultimate) {
            //??????????????????
            let qmsg = new icmsg.DungeonUltimateExitReq()
            qmsg.stageId = model.id;
            qmsg.clear = this.temIsWin
            NetManager.send(qmsg, (data: icmsg.DungeonUltimateExitRsp) => {
                if (!this.model) return;
                if (!this.active) return;
                this.reqExitRsp(data);
            })
        } else if (model.stageConfig.copy_id == CopyType.NONE && model.arenaSyncData.fightType == 'PIECES_CHESS') {
            let cb = () => {
                let qmsg = new icmsg.PiecesExitReq();
                qmsg.type = 2;
                qmsg.fightState = '';
                qmsg.nowRound = model.arenaSyncData.mainModel.enemies.length == 0 && model.arenaSyncData.mainModel.curEnemies.length == 0 ? model.wave : model.wave - 1;
                qmsg.playerHP = model.arenaSyncData.mainModel.proteges[0].model.hp;
                NetManager.send(qmsg, (data: icmsg.PiecesExitRsp) => {
                    if (!this.model) return;
                    if (!this.active) return;
                    this.reqExitRsp(data);
                }, this);
            }
            let pM = ModelManager.get(PiecesModel);
            let mainModel = this.model.arenaSyncData.mainModel;
            if (this.model.wave > 0 && this.model.wave > pM.passWave
                && this.model.wave == ConfigManager.getItemByField(Pieces_globalCfg, 'key', 'round1').value[0]
                && mainModel.enemies.length == 0 && mainModel.curEnemies.length == 0 && mainModel.proteges[0].model.hp > 0) {
                let req = new icmsg.PiecesRoundEndReq();
                req.type = pM.curModel;
                req.isKillAll = true;
                NetManager.send(req, (resp: icmsg.PiecesRoundEndRsp) => {
                    if (!this.model) return;
                    if (!this.active) return;
                    cb();
                }, this);
            }
            else {
                cb();
            }
        }
        else if (model.stageConfig.copy_id == CopyType.NONE && model.arenaSyncData.fightType == 'PIECES_ENDLESS') {
            let cb = () => {
                let qmsg = new icmsg.PiecesExitReq();
                qmsg.type = 1;
                qmsg.fightState = '';
                qmsg.nowRound = model.arenaSyncData.mainModel.enemies.length == 0 && model.arenaSyncData.mainModel.curEnemies.length == 0 ? model.wave : model.wave - 1;
                qmsg.playerHP = model.arenaSyncData.mainModel.proteges[0].model.hp;
                NetManager.send(qmsg, (data: icmsg.PiecesExitRsp) => {
                    if (!this.model) return;
                    if (!this.active) return;
                    this.reqExitRsp(data);
                }, this);
            }
            let pM = ModelManager.get(PiecesModel);
            let mainModel = this.model.arenaSyncData.mainModel;
            if (this.model.wave > 0 && this.model.wave > pM.passWave
                && this.model.wave == ConfigManager.getItemByField(Pieces_globalCfg, 'key', 'round2').value[0]
                && mainModel.enemies.length == 0 && mainModel.curEnemies.length == 0 && mainModel.proteges[0].model.hp > 0) {
                let req = new icmsg.PiecesRoundEndReq();
                req.type = pM.curModel;
                req.isKillAll = true;
                req.nowRound = this.model.wave;
                req.playerHP = mainModel.proteges[0].model.hp;
                NetManager.send(req, (resp: icmsg.PiecesRoundEndRsp) => {
                    if (!this.model) return;
                    if (!this.active) return;
                    cb();
                }, this);
            }
            else {
                cb();
            }
        } else {
            let qmsg = model.stageConfig.copy_id == CopyType.Survival ? new icmsg.SurvivalExitReq() : new icmsg.DungeonExitReq();
            qmsg.stageId = model.id;
            qmsg.clear = this.temIsWin && goldWin;
            // ???????????????
            if (this.temIsWin && (model.stageConfig.copy_id == CopyType.RookieCup || model.stageConfig.copy_id == CopyType.ChallengeCup)) {
                if (qmsg instanceof icmsg.DungeonExitReq) {
                    // let max = 0;
                    // let cur = 0;
                    // model.proteges.forEach(protege => {
                    //     max += protege.model.config.hp;
                    //     cur += protege.model.hp;
                    // })
                    // let cups = 1;
                    // if (cur == max) {
                    //     cups = 3;
                    // } else if (cur / max >= 0.6) {
                    //     cups = 2;
                    // }
                    qmsg.cups = model.gateconditionUtil.getGateConditionCupNum();
                }
            }
            if (this.temIsWin) {
                // ??????????????????
                if (qmsg instanceof icmsg.DungeonExitReq &&
                    (model.minPower <= 0 || model.totalPower < model.minPower)) {
                    // ??????????????????????????????????????????????????????
                    try {
                        // ????????????????????????
                        let heroes = [];
                        let data = {
                            h: [-1, -1, -1, -1, -1, -1],   // ???????????????[heroId, ... ]
                            a: model.actions,    // ??????????????????[[time, skill_id, pos_x, pos_y]]    
                            e: model.enemyBorns,   // ????????????
                        };
                        for (let i = 0, n = model.towers.length; i < n; i++) {
                            let t = model.towers[i];
                            if (t.hero) {
                                let m = t.hero.model;
                                if (m.item && m.item.series > 0) {
                                    // ??????????????????????????????????????????
                                    heroes.push(m.heroId);
                                    data.h[t.id - 1] = m.heroId;
                                }
                            }
                        }
                        qmsg.heroes = heroes;   // ????????????????????????
                        qmsg.rndseed = model.seed; // ????????????????????????
                        let str: any = gdk.amf.encodeObject(data);
                        str = gdk.pako.gzip(str);
                        str = gdk.Buffer.from(str).toString('binary');
                        qmsg.actions = str;  // ????????????????????????
                    } catch (e) { }
                }
            } else if (qmsg instanceof icmsg.DungeonExitReq) {
                // ????????????
                qmsg.heroes = [];   // ????????????????????????
                qmsg.rndseed = 0;   // ????????????????????????
                qmsg.actions = '';  // ?????????????????????????????????
            }
            NetManager.send(qmsg, (rmsg: icmsg.DungeonExitRsp | icmsg.SurvivalExitRsp) => {
                // ???????????? ?????????????????????
                try {
                    qmsg.clear && CopyUtil.stageComplete(rmsg.stageId);
                    isCopy && gdk.e.emit(InstanceEventId.REQ_INST_LIST);
                } catch (e) { }
                if (!this.model) return;
                if (!this.active) return;
                this.reqExitRsp(rmsg);
            }, this);
        }
    }

    // ????????????
    reqExitRsp(rmsg: icmsg.DungeonExitRsp |
        icmsg.SurvivalExitRsp |
        icmsg.FootholdFightOverRsp |
        icmsg.ActivityCaveExitRsp |
        icmsg.BountyFightOverRsp |
        icmsg.DoomsDayExitRsp |
        icmsg.MartialSoulExitRsp |
        icmsg.GuildBossExitRsp |
        icmsg.DungeonHeroExitRsp |
        icmsg.DungeonRuneExitRsp |
        icmsg.ArenaFightResultRsp |
        icmsg.DungeonOrdealExitRsp |
        icmsg.AdventureExitRsp |
        icmsg.ChampionGuessFightResultRsp |
        icmsg.ChampionFightOverRsp |
        icmsg.RelicFightOverRsp |
        icmsg.VaultFightOverRsp |
        icmsg.RuinChallengeExitRsp |
        icmsg.NewOrdealExitRsp |
        icmsg.SiegeExitRsp |
        icmsg.ArenaTeamFightOverRsp |
        icmsg.RuinExitRsp |
        icmsg.PeakExitRsp |
        icmsg.FootholdGatherFightOverRsp |
        icmsg.GuardianCopyExitRsp |
        icmsg.GuardianTowerExitRsp |
        icmsg.HeroAwakeExitRsp |
        icmsg.Adventure2ExitRsp |
        icmsg.PiecesExitRsp |
        icmsg.ArenaHonorExitRsp |
        icmsg.ExpeditionFightOverRsp |
        icmsg.DungeonUltimateExitRsp |
        icmsg.RoyalFightOverRsp |
        icmsg.DungeonSevenDayExitRsp
    ) {
        gdk.gui.hideWaiting("PveSceneOver");
        gdk.gui.removeAllPopup();
        // ???????????????????????????
        let stageCfg = this.model.stageConfig;
        let isWin = this.temIsWin;
        if (this.temIsWin || stageCfg.copy_id == CopyType.FootHold || stageCfg.copy_id == CopyType.GuildBoss || stageCfg.copy_id == CopyType.HeroTrial || stageCfg.copy_id == CopyType.NewHeroTrial || stageCfg.copy_id == CopyType.Siege
            || (stageCfg.copy_id == CopyType.NONE && this.model.arenaSyncData.fightType == 'PIECES_CHESS')
            || (stageCfg.copy_id == CopyType.NONE && this.model.arenaSyncData.fightType == 'PIECES_ENDLESS')) {
            // ?????????or??????boss????????????
            isWin = true;
        }
        //?????????pvp ?????????????????????
        if (this.model.stageConfig.copy_id == CopyType.NONE && this.model.arenaSyncData.fightType == 'FOOTHOLD') {
            let fhModle = ModelManager.get(FootHoldModel);
            if (fhModle.pvpPlayerDmg > 0) {
                isWin = true;
            }
        }

        if (this.model.stageConfig.copy_id == CopyType.NONE && this.model.arenaSyncData.fightType == 'FOOTHOLD_GATHER') {
            let fhModle = ModelManager.get(FootHoldModel);
            let newHps = (rmsg as icmsg.FootholdGatherFightOverRsp).newHPs
            let winCount = 0
            newHps.forEach(element => {
                if (element.value == 0) {
                    winCount++
                }
            });
            if (newHps.length != 0 && winCount == newHps.length) {
                isWin = true
                fhModle.isPvp = true
                fhModle.isPvpWin = true
            } else {
                isWin = false
            }
        }

        if (this.model.stageConfig.copy_id == CopyType.Adventure) {
            let advModel = ModelManager.get(AdventureModel)
            if (advModel.difficulty == 4) {
                isWin = true;
                advModel.rankAfter = (rmsg as icmsg.AdventureExitRsp).rankAf
                advModel.rankBefore = (rmsg as icmsg.AdventureExitRsp).rankBf
            }
        }
        if (this.model.stageConfig.copy_id == CopyType.NewAdventure) {
            let advModel = ModelManager.get(NewAdventureModel)
            if (advModel.copyType == 1) {
                //isWin = true;
                advModel.rankAfter = (rmsg as icmsg.Adventure2ExitRsp).rankAf
                advModel.rankBefore = (rmsg as icmsg.Adventure2ExitRsp).rankBf
            }
        }

        if (this.model.stageConfig.copy_id == CopyType.NONE &&
            this.model.arenaSyncData.fightType == 'RELIC' &&
            rmsg instanceof icmsg.RelicFightOverRsp) {
            if (rmsg.remainHP <= 0) {
                isWin = true;
            }
        }

        if (this.model.stageConfig.copy_id == CopyType.NONE &&
            this.model.arenaSyncData.fightType == 'CHAMPION_GUESS') {
            // ??????PVE??????
            let view = gdk.gui.getCurrentView();
            let panel = view.getComponent(gdk.BasePanel);
            if (panel) {
                panel.close();
            }
            gdk.panel.setArgs(PanelId.ChampionGuessView, ModelManager.get(ChampionModel).guessIndex);
            gdk.panel.open(PanelId.ChampionGuessView);
            gdk.panel.setArgs(PanelId.ChampionGuessResultView, rmsg);
            gdk.panel.open(PanelId.ChampionGuessResultView);
        } else if (this.model.stageConfig.copy_id == CopyType.NONE &&
            this.model.arenaSyncData.fightType == 'ARENAHONOR_GUESS') {
            // ??????PVE??????
            let view = gdk.gui.getCurrentView();
            let panel = view.getComponent(gdk.BasePanel);
            if (panel) {
                panel.close();
            }
            gdk.panel.setArgs(PanelId.ArenaHonorGuessView, ModelManager.get(ArenaHonorModel).guessIndex);
            gdk.panel.open(PanelId.ArenaHonorGuessView);
            gdk.panel.setArgs(PanelId.ArenaHonorGuessResultView, rmsg);
            gdk.panel.open(PanelId.ArenaHonorGuessResultView);
        } else if (this.model.stageConfig.copy_id == CopyType.NONE &&
            this.model.arenaSyncData.fightType == 'WORLDHONOR_GUESS') {
            // ??????PVE??????
            let view = gdk.gui.getCurrentView();
            let panel = view.getComponent(gdk.BasePanel);
            if (panel) {
                panel.close();
            }
            gdk.panel.setArgs(PanelId.WorldHonorGuessView, ModelManager.get(WorldHonorModel).guessIndex);
            gdk.panel.open(PanelId.WorldHonorGuessView);
            gdk.panel.setArgs(PanelId.WorldHonorGuessResultView, rmsg);
            gdk.panel.open(PanelId.WorldHonorGuessResultView);
        } else {
            if (isWin) {
                // ??????????????????this.isWin || stageCfg.copy_id == CopyType.FootHold
                gdk.panel.setArgs(PanelId.PveSceneWinPanel, rmsg);
                gdk.panel.open(PanelId.PveSceneWinPanel);
            } else {
                // ??????????????????
                gdk.panel.setArgs(PanelId.PveSceneFailPanel, rmsg);
                gdk.panel.open(PanelId.PveSceneFailPanel);
            }
        }

        // ????????????
        this.model.state = isWin ? PveSceneState.Win : PveSceneState.Over;
        this.model.timeScale = 1.0;
        // ????????????
        if ([CopyType.FootHold, CopyType.GuildBoss].indexOf(stageCfg.copy_id) == -1 && !this.model.isBounty && !this.model.isMirror) {
            GuideUtil.activeGuide('end#' + rmsg["stageId"] + (isWin ? '#win' : '#fail'));
        }
    }

    onExit() {
        gdk.gui.hideWaiting("PveSceneOver");
        NetManager.targetOff(this);
        ErrorManager.targetOff(this);
        super.onExit();
    }
}