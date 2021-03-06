import ConfigManager from '../../../../common/managers/ConfigManager';
import ModelManager from '../../../../common/managers/ModelManager';
import RoleModel from '../../../../common/models/RoleModel';
import RoyalModel from '../../../../common/models/RoyalModel';
import GuideUtil from '../../../../common/utils/GuideUtil';
import JumpUtils from '../../../../common/utils/JumpUtils';
import MathUtil from '../../../../common/utils/MathUtil';
import PanelId from '../../../../configs/ids/PanelId';
import NewAdventureModel from '../../../adventure2/model/NewAdventureModel';
import RandomBossViewCtrl from '../../../arena/ctrl/fight/RandomBossViewCtrl';
import ExpeditionModel from '../../../guild/ctrl/expedition/ExpeditionModel';
import FootHoldModel from '../../../guild/ctrl/footHold/FootHoldModel';
import { PveCalledAIType } from '../../const/PveCalled';
import { PveFightCtrl } from '../../core/PveFightCtrl';
import { PveCampType } from '../../core/PveFightModel';
import { PveHurtType } from '../../ctrl/base/PveHurtEffect';
import PveCalledCtrl from '../../ctrl/fight/PveCalledCtrl';
import PveEnemyCtrl from '../../ctrl/fight/PveEnemyCtrl';
import PveGateCtrl from '../../ctrl/fight/PveGateCtrl';
import PveSpawnCtrl from '../../ctrl/fight/PveSpawnCtrl';
import PveTrapCtrl from '../../ctrl/fight/PveTrapCtrl';
import PveBossHpBarPopupCtrl from '../../ctrl/view/PveBossHpBarPopupCtrl';
import PveEventId from '../../enum/PveEventId';
import PveFsmEventId from '../../enum/PveFsmEventId';
import PveSceneState from '../../enum/PveSceneState';
import PveCalledModel from '../../model/PveCalledModel';
import PveEnemyModel from '../../model/PveEnemyModel';
import PveGateModel from '../../model/PveGateModel';
import { WaveEnemyInfo } from '../../model/PveSceneModel';
import PveTrapModel from '../../model/PveTrapModel';
import PveFightUtil, { PveCallerArgs } from '../../utils/PveFightUtil';
import PvePool from '../../utils/PvePool';
import PveTool from '../../utils/PveTool';
import PveSceneBaseAction from '../base/PveSceneBaseAction';
import { Adventure2_adventureCfg, Global_pvpCfg, Pve_bossbornCfg } from './../../../../a/config';
import CopyModel, { CopyType } from './../../../../common/models/CopyModel';

/**
 * PVE????????????????????????
 * @Author: sthoo.huang
 * @Date: 2019-03-19 10:11:56
 * @Last Modified by: luoyong
 * @Last Modified time: 2021-09-24 11:21:18
 */

@gdk.fsm.action("PveSceneCheckAction", "Pve/Scene")

export default class PveSceneCheckAction extends PveSceneBaseAction {
    spawnDic: { [id: string]: PveSpawnCtrl };

    onEnter() {
        super.onEnter();
        // ??????????????????
        this.model.state = PveSceneState.Fight;
        // ????????????????????????
        if (this.isOver) {
            this.gameOver();
            return;
        }
        // ?????????????????????
        this.spawnDic = {};
        for (let i = 0; i < this.model.spawns.length; i++) {
            let spawn: PveSpawnCtrl = this.model.spawns[i];
            this.spawnDic[spawn.model.key] = spawn;
        }
        // ??????????????????????????????????????????
        this.addEvent(PveEventId.PVE_CREATE_ENEMY, this.createEnemy);
        this.addEvent(PveEventId.PVE_CREATE_CALLER, this.createCaller);
        this.addEvent(PveEventId.PVE_CREATE_TRAP, this.createTrap);
        this.addEvent(PveEventId.PVE_CREATE_GATE, this.createGate);
        this.addEvent(PveEventId.PVE_APPEND_OPPSITE_ENEMIES, this.appendEnemy);
    }

    /**
     * ??????????????????
     * @param eventType 
     * @param callback 
     */
    private addEvent(eventType: string, callback: Function) {
        let name = `${eventType}#${this.model.isMirror ? 'mirror' : 'main'}`;
        gdk.e.on(name, callback, this, 0, false);
    }

    update(dt: number) {
        let model = this.model;
        if (model.state !== PveSceneState.Fight) return;
        if (model.loading) return;
        // if (model.isDemo) {
        //     //??????????????????????????????????????????????????????
        //     let t = model.timeScale;
        //     if (gdk.panel.hasOpening || gdk.gui.hasPopup()) {
        //         (t !== 0) && (model.timeScale = 0);
        //     } else if (t === 0) {
        //         model.timeScale = 1;
        //     }
        // }
        let timeScale = model.timeScale;
        if (timeScale <= 0) return;
        if (timeScale !== 1) {
            dt *= model.timeScale;
        }
        model.realTime += dt;
        // ???????????????????????????
        let ctrl = this.ctrl;
        if ((ctrl.gameTime && ctrl.gameTime.enabledInHierarchy) || (ctrl.royalGameTime && ctrl.royalGameTime.enabledInHierarchy)) {
            ctrl.showTime -= dt;
            if (ctrl.showTime <= 0) {
                let time = 0;
                if (model.stageConfig.copy_id == CopyType.Rune) {
                    time = model.stageConfig.time - Math.floor(model.realTime);
                    if (time <= 0) {
                        // ?????????????????????????????????
                        PveTool.gameOver(model, true);
                        return;
                    }
                } else if (model.stageConfig.copy_id == CopyType.NONE && model.arenaSyncData.fightType == 'VAULT') {
                    time = 600 - Math.floor(model.realTime);
                    if (time <= 0) {
                        // ?????????????????????????????????
                        PveTool.gameOver(model, false);
                        return;
                    }
                } else if (model.stageConfig.copy_id == CopyType.NONE && (model.arenaSyncData.fightType == 'ROYAL' || model.arenaSyncData.fightType == 'ROYAL_TEST')) {
                    time = model.stageConfig.time - Math.floor(model.realTime);
                    if (time <= 0) {
                        // ?????????????????????????????????
                        //PveTool.gameOver(model, false);
                        if (!model.isMirror) {
                            //??????????????????
                            let rmodel = ModelManager.get(RoyalModel)
                            //???????????????????????????
                            if (rmodel.winElite[3]) {
                                let enemyId = rmodel.winElite[3]
                                let mainEnemyCtrl = model.getFightBybaseId(enemyId);
                                let mainHp = 0;
                                if (mainEnemyCtrl && mainEnemyCtrl.model) {
                                    mainHp = mainEnemyCtrl.model.hp;
                                }
                                let mirrorEnemyCtrl = model.arenaSyncData.mirrorModel.getFightBybaseId(enemyId);
                                let mirrorHp = 0;
                                if (mirrorEnemyCtrl && mirrorEnemyCtrl.model) {
                                    mirrorHp = mirrorEnemyCtrl.model.hp;
                                }
                                if (mainHp < mirrorHp) {
                                    PveTool.gameOver(model, true);
                                    return;
                                }
                            }
                            //???????????????????????????
                            if (rmodel.winElite[5]) {
                                let mainKillNum = model.killedEnemy;
                                let mirrorKillNum = model.arenaSyncData.mirrorModel.killedEnemy;
                                if (mainKillNum > mirrorKillNum) {
                                    PveTool.gameOver(model, true);
                                    return;
                                }
                            }
                        }
                        PveTool.gameOver(model, false);
                        return;
                    }
                } else {
                    time = Math.floor(model.realTime);
                }
                let s = time % 60;
                let m = Math.floor((time - s) / 60);
                let str = (m < 10 ? `0${m}` : `${m}`) + '/' + (s < 10 ? `0${s}` : `${s}`);
                if (ctrl.gameTime) {
                    ctrl.gameTime.string = str;
                }
                if (ctrl.royalGameTime) {
                    ctrl.royalGameTime.string = str;
                }
                ctrl.showTime = 1;
            }
        }
        // ?????????
        this.updateScript(dt);
        this.isOver && this.gameOver();
    }

    // ?????????????????????update?????????????????????????????????
    updateScript(dt: number) {
        let model = this.model;
        // ??????????????????
        model.frameId++;
        model.time += dt;
        model.waveTime += dt;
        model.isLogicalFrame = model.frameId % 2 == 0 || cc.game.getFrameRate() <= 30;
        // ?????????????????????
        this.checkSpawn(dt);
        // ????????????????????????
        let all = model.getAllFightArr();
        model.fightSelector.clear();
        for (let i = 0, n = all.length; i < n; i++) {
            let t = all[i];
            if (t.isAlive && t.model.camp != PveCampType.Neutral) {
                // ?????????????????????????????????
                model.fightSelector.insertFight(t);
            }
        }
        // ?????????????????????????????????
        let manager = cc.director.getCollisionManager();
        let b = model && model.arenaSyncData && model.arenaSyncData.fightType == 'PIECES_CHESS';
        if (manager.enabled && !b) {
            let cb = model.traps.length > 0;
            if (cb) {
                cb = model.traps.some(t => t.model.config.range_type == 2);
                if (!cb && model.gates.length > 0) {
                    cb = model.gates.some(g => g.model.config.range_type == 2);
                }
            }
            if (!cb) {
                manager.enabled = false;
            }
        }
        if (!manager.enabled && b) { manager.enabled = true; }
        // ???????????????????????????
        if (model.manualSkill) {
            let skill = model.manualSkill;
            let general = model.generals[0];
            !model.isReplay && model.actions.push([
                model.frameId,
                skill.config.skill_id,
                skill.targetPos.x,
                skill.targetPos.y,
                model.energy,
                model.time,
            ]);
            model.manualSkill = null;
            general.fsm.broadcastEvent(PveFsmEventId.PVE_FIGHT_MANUAL_ATTACK);
            general.setDir(skill.targetPos);
            skill.option.onComplete = () => {
                // ????????????
                if (!general) return;
                if (!general.model) return;
                general.model.isInManual = false;
            };
            skill.option.thisArg = this;
            general.showSkillName(skill.config.skill_id);
            PveTool.useSkill(skill, model);
        }
        // ?????????????????????updateScript??????
        for (let i = 0, n = model.skills.length; i < n; i++) {
            let comp = model.skills[i];
            if (comp && comp.enabledInHierarchy) {
                comp.updateScript(dt);
            }
        }
        // ???????????????????????????updateScript??????
        for (let i = 0, n = all.length; i < n; i++) {
            let comp = all[i];
            if (comp && comp.enabledInHierarchy) {
                comp.updateScript(dt);
            }
        }
    }

    /**
     * ???????????????????????????
     * @param params
     */
    appendEnemy(params: any[]) {
        let id = params[0] as number;
        let arr = this.model.arenaEnemies;
        // let len = arr.length;
        // let time = len > 0 ? arr[len - 1].time : this.model.waveTime;
        let info = new WaveEnemyInfo();
        info.enemyId = id;
        info.spawn = 11;
        info.time = this.model.waveTime + 3;
        info.num = 1;
        info['isNew'] = true;
        arr.push(info);
        this.model.maxEnemy += info.num;
        this.ctrl.updateEnemiesList(arr);
        // ????????????????????????????????????
        if (arr.length == 1 && !this.model.isMirror) {
            GuideUtil.activeGuide(`monster#0#append`);
        }
    }

    // ????????????
    checkEnemies(arr: WaveEnemyInfo[]) {
        if (!arr || !arr.length) {
            return false;
        }
        let model = this.model;
        let time = model.waveTime;
        let ret = false;
        while (arr.length) {
            if (time < arr[0].time) break;
            // ???????????????????????????????????????????????????
            let info = arr.shift();
            for (let i = 0; i < info.num; i++) {
                ret = true;
                this.createOneEnemy(info);
            }
            // ????????????????????????????????????????????????
            if (!model.isDemo &&
                !model.isReplay &&
                !(model.stageConfig.copy_id == CopyType.NONE)
            ) {
                model.enemyBorns.push([
                    model.frameId,
                    info.enemyId,
                    info.spawn,
                    info.num,
                    info.wait,
                    info.wait_delay,
                    info.born_animation,
                ]);
            }
        }
        return ret;
    }

    // ?????????????????????
    checkSpawn(dt: number) {
        let model = this.model;
        this.checkEnemies(model.curEnemies);
        // ???????????????????????????????????????????????????
        let shared = model.arenaSyncData;
        if (shared && this.checkEnemies(model.arenaEnemies)) {
            // this.ctrl.updateEnemiesList(model.arenaEnemies);
            this.ctrl.updateEnemiesSpine(() => {
                if (!this.active) return;
                if (!this.ctrl) return;
                this.ctrl.updateEnemiesList(model.arenaEnemies);
            });
        }
        // ????????????????????????????????????????????????????????????????????????????????????????????????
        if (model.curEnemies.length == 0 &&
            model.hasWave && !model.proteges.some(e => e.isDead)
        ) {
            if (shared) {
                // ????????????
                let alive = shared.waveTimeOut !== undefined || model.enemies.some(e => {
                    let m = e.model;
                    return m.config.type != 5 && m.roadIndex != 11;
                });
                if (!alive) {
                    // ??????????????????????????????????????????????????????
                    shared.waveTimeOut = 15;
                }
                if (shared.fightType == 'PIECES_CHESS' || shared.fightType == 'PIECES_ENDLESS') {
                    //???????????????,??????????????????????????????,?????????????????????????????????
                    if (model.waveBeginning) {
                        shared.waveTimeOut = 99999;
                    }
                    let mainModel = shared.mainModel;
                    let mirrorModel = shared.mirrorModel;
                    if (model.waveBeginning
                        && mainModel.enemies.length == 0 && mainModel.curEnemies.length == 0
                        && mirrorModel.enemies.length == 0 && mirrorModel.curEnemies.length == 0) {
                        model.ctrl.fsm.sendEvent(PveFsmEventId.PVE_PIECES_WAVE_OVER);
                        return
                    }
                }
            } else {
                // ????????????
                let alive = model.enemies.some(e => e.model.config.type != 5);
                if (!alive) {
                    // ????????????????????????????????????
                    let b = !model.isDemo && !model.isReplay && !model.isBounty;
                    if (b && model.wave > 0) {
                        GuideUtil.activeGuide(`wave#${model.id}#${model.wave}#end`);
                    }
                    model.setWaveBy(model.wave + 1);
                    if (b && model.curEnemies.length > 0) {
                        GuideUtil.activeGuide(`wave#${model.id}#${model.wave}#begin`);
                    }
                }
            }
        }
        // ?????????????????????????????????????????????
        if (shared && !model.isMirror) {
            // ???BOSS????????????
            if (shared.bossTimeOut !== undefined && shared.bossTimeOut > 0) {
                shared.bossTimeOut -= dt;
                if (shared.bossTimeOut <= 0) {
                    shared.bossTimeOut = undefined;
                    // ????????????
                    JumpUtils.pauseFight();
                    // ??????????????????
                    let cb = (id: number) => {
                        let shared = model.arenaSyncData
                        let info = new WaveEnemyInfo();
                        info.enemyId = shared.bossEnemyId = id;
                        info.spawn = 1;
                        info.time = model.waveTime;
                        info.num = 1;
                        // ????????????????????????????????????
                        shared.mainModel.curEnemies.unshift(info);
                        shared.mirrorModel.curEnemies.unshift(info);
                        shared.waveTimeOut = 9999;
                        // ????????????
                        JumpUtils.resumeFight();
                    }
                    gdk.panel.open(PanelId.RandomBossView, (node) => {
                        let c = node.getComponent(RandomBossViewCtrl);
                        let cfgs = ConfigManager.getItemById(Pve_bossbornCfg, shared.bossId);
                        c.play(cfgs, cb);
                    });
                }
                model.ctrl.updateBossTime(shared.bossTimeOut);
            }
            // ??????????????????????????????
            if (shared.waveTimeOut !== undefined && model.hasWave) {
                shared.waveTimeOut -= dt;
                if (shared.waveTimeOut <= 0) {
                    shared.waveTimeOut = undefined;
                    shared.mainModel.waveBeginning = true;
                    shared.mirrorModel.waveBeginning = true;
                    shared.mainModel.setWaveBy(shared.mainModel.wave + 1);
                    shared.mirrorModel.setWaveBy(shared.mirrorModel.wave + 1);
                    // ???????????????????????????
                    if (shared.fightType == 'ARENA') {
                        GuideUtil.activeGuide(`wave#${shared.args[2].robotId}#${shared.mainModel.wave}#begin`);
                    }
                }
            }
        }
    }

    // ????????????
    gameOver() {
        let model = this.model;
        // ????????????????????????
        if (model.isDemo || (!model.isReplay && model.config.endless)) {
            // ??????????????????
            model.setWaveBy(1);
            return;
        }
        PveTool.gameOver(model, true);
    }

    // ??????????????????
    get isOver(): boolean {
        let model = this.model;
        if (!model) return false;
        //????????? AI??????????????????????????????????????????
        if (model.arenaSyncData && ['PIECES_CHESS', 'PIECES_ENDLESS'].indexOf(model.arenaSyncData.fightType) !== -1 && model.isMirror) return false;
        if (model.curEnemies.length > 0) return false;
        if (model.enemies.length > 0) return false;
        if (model.hasWave) return false;
        if (model.killedEnemy == 0 && model.arrivalEnemy == 0) {
            iclib.ErrorUtils.post('???????????????????????????????????????!');
            return false;
        }
        // ????????????
        return true;
    }

    /**
     * ????????????????????????
     * @param info
     */
    createOneEnemy(info: WaveEnemyInfo) {
        let spawn = this.spawnDic[info.spawn];
        if (!spawn) {
            cc.error(`?????????${info.spawn}???????????????????????????`);
            return;
        }

        // ????????????
        let model = spawn.model;
        PveFightUtil.createEnemy(
            this.model,
            info.enemyId,
            model.pos,
            model.road.concat(),
            model.index,
            null,
            null,
            info.wait,
            info.wait_delay,
            null,
            info.born_animation,
        );

        // ??????????????????
        let ctrl = this.ctrl;
        let scrollView = ctrl.scrollView;
        let enemyIndicatro = ctrl.enemyIndicatro;
        if (scrollView && scrollView.enabled && enemyIndicatro) {

            // ??????????????????
            let checkState = function () {
                let spp = ctrl.thing.convertToWorldSpaceAR(model.pos);
                let scp = scrollView.getScrollOffset();
                let p = scrollView.content.convertToNodeSpaceAR(spp);
                if (p.x + scp.x < 0) {
                    // ???????????????????????????
                    let widget = enemyIndicatro.getComponent(cc.Widget);
                    widget.left = 5;
                    widget.isAlignLeft = true;
                    widget.isAlignRight = false;
                } else if (p.x + scp.x > scrollView.node.width) {
                    // ???????????????????????????
                    let widget = enemyIndicatro.getComponent(cc.Widget);
                    widget.right = 5;
                    widget.isAlignLeft = false;
                    widget.isAlignRight = true;
                } else {
                    // ???????????????????????????????????????
                    return false;
                }
                return true;
            };

            // ????????????????????????
            if (checkState()) {
                // ??????5?????????
                let time = Date.now();
                gdk.NodeTool.show(enemyIndicatro);
                gdk.Timer.clearAll(enemyIndicatro);
                gdk.Timer.frameLoop(1, enemyIndicatro, () => {
                    if (!cc.isValid(enemyIndicatro)) return;
                    if (!enemyIndicatro.active || !checkState() || Date.now() - time > 5000) {
                        gdk.Timer.clearAll(enemyIndicatro);
                        gdk.NodeTool.hide(enemyIndicatro);
                        return;
                    }
                    // ??????????????????
                    let spp = ctrl.thing.convertToWorldSpaceAR(model.pos);
                    let to = scrollView.content.convertToNodeSpaceAR(spp);
                    let from = enemyIndicatro.getPosition();
                    from = enemyIndicatro.parent.convertToWorldSpaceAR(from);
                    from = scrollView.content.convertToNodeSpaceAR(from);
                    let angle = Math.atan2(from.y - to.y, from.x - to.x);
                    let degree = angle * 180 / Math.PI;
                    enemyIndicatro.scaleX = -1;
                    enemyIndicatro.angle = -(degree <= 0 ? -degree : 360 - degree);
                });
            }
        }
    }

    /**
     * ??????????????????
     * @param params 
     */
    createEnemy(params: any[]) {
        let id: number = params[0],
            pos: cc.Vec2 = params[1],
            road: cc.Vec2[] = params[2],
            roadIndex: number = params[3],
            i: number = params[4],
            n: number = params[5],
            wait: number = params[6],
            wait_delay: number = params[7],
            time: number = params[8],
            born_animation: string = params[9],
            radius: number = params[10],
            owner: PveFightCtrl = params[11];
        let sceneModel = this.model;
        let node: cc.Node = PvePool.get(sceneModel.ctrl.enemyPrefab);
        let enemy: PveEnemyCtrl = node.getComponent(PveEnemyCtrl);
        let model: PveEnemyModel = PvePool.get(PveEnemyModel);
        enemy.sceneModel = sceneModel;
        enemy.model = model;
        model.ctrl = enemy;
        model.owner = owner;
        model.propParam = undefined;
        // ?????????????????????????????????
        if (model.camp == PveCampType.Enemy) {
            let stageCfg = sceneModel.stageConfig;
            switch (stageCfg.copy_id) {
                case CopyType.NONE:
                    // ????????????
                    let sd = sceneModel.arenaSyncData;
                    if (sd.fightType == 'VAULT' && !sceneModel.isMirror) {
                        model.propParam = sd.mirrorModel.arenaSyncData.pwoer;
                    } else {
                        model.propParam = sd.pwoer;
                    }
                    if (!(sd.fightType == 'PIECES_CHESS' || sd.fightType == 'PIECES_ENDLESS')) {
                        // ??????????????????????????????
                        let gpcfgs = ConfigManager.getItems(Global_pvpCfg).sort((a, b) => a.power - b.power);
                        for (let i = gpcfgs.length - 1; i >= 0; i--) {
                            if (model.propParam >= gpcfgs[i].power) {
                                model.propExtra = {
                                    atk: gpcfgs[i].atk_ratio,
                                    hp: gpcfgs[i].hp_ratio,
                                    def: gpcfgs[i].def_ratio,
                                    hit: gpcfgs[i].hit_ratio,
                                    dodge: gpcfgs[i].dodge_ratio,
                                };
                                break;
                            }
                        }
                    }
                    break;

                case CopyType.Survival:
                    // ????????????
                    let copyModel = ModelManager.get(CopyModel);
                    model.propParam = copyModel.survivalStateMsg.avgHeroPower;
                    break;
                case CopyType.EndRuin:
                case CopyType.Ultimate:
                    // ????????????
                    // let copyModel = ModelManager.get(CopyModel);
                    model.propParam = this.model.stageConfig.power / 6
                    break;
                case CopyType.NewAdventure:
                    // ???????????????
                    let adModel = ModelManager.get(NewAdventureModel);
                    if (adModel.copyType == 0) {
                        let temCfg = ConfigManager.getItemByField(Adventure2_adventureCfg, 'difficulty', adModel.difficulty, { plate: adModel.normal_selectIndex, layer_id: adModel.normal_layerId })
                        if (temCfg) {
                            model.propParam = temCfg.power / 6;
                        }
                    } else {
                        let temCfg = ConfigManager.getItemByField(Adventure2_adventureCfg, 'difficulty', 4, { plate: adModel.endless_selectIndex, layer_id: adModel.endless_layerId, line: adModel.endless_line })
                        if (temCfg) {
                            model.propParam = temCfg.power / 6;
                        }
                    }
                    //model.propParam = copyModel.survivalStateMsg.avgHeroPower;
                    break;
                case CopyType.Expedition:
                    //????????????
                    let epModel = ModelManager.get(ExpeditionModel)
                    if (epModel.curStage) {
                        model.propParam = epModel.curStage.power / 6
                    }
                    break
                case CopyType.SevenDayWar:
                    model.propParam = ModelManager.get(RoleModel).power / 6
                    break
            }
            // ???????????????????????????????????? 
            model.atkCorrect = 1;
            model.hpCorrect = 1;
            if (cc.js.isNumber(stageCfg.atk_correct)) {
                let r = sceneModel.config.endless ? sceneModel.realWave : 1;
                model.atkCorrect = 1 + r * stageCfg.atk_correct as any;
            }
            if (cc.js.isNumber(stageCfg.hp_correct)) {
                let r = sceneModel.config.endless ? sceneModel.realWave : 1;
                model.hpCorrect = 1 + r * stageCfg.hp_correct as any;
            }
        }
        model.id = id;
        model.roadIndex = roadIndex;
        model.road = road;
        model.born_animation = born_animation;
        if (cc.js.isNumber(wait) && wait > 0) {
            model.watiTime = wait;
            model.needWait = true;
        } else {
            model.watiTime = 0;
            model.needWait = false;
        }
        if (cc.js.isNumber(wait_delay) && wait_delay > 0) {
            model.wait_delayTime = wait_delay
        } else {
            model.wait_delayTime = 0
        }
        if (cc.js.isNumber(time) && time > 0) {
            model.isCallMonster = true;
            model.callMonsterTime = time;
        } else {
            model.isCallMonster = false;
            model.callMonsterTime = 0;
        }
        // ???????????????????????????
        if (model.camp == PveCampType.Enemy) {
            let temRadius = 40;
            if (cc.js.isNumber(radius) && radius > 0) {
                temRadius = radius
            }
            if (cc.js.isNumber(i) && cc.js.isNumber(n)) {
                let temData = enemy.setMonsterPosRoad(pos, roadIndex, i, road[0], temRadius);
                pos = temData.pos;
                enemy.model.road = temData.road;
            }
            // ??????????????????????????????
            if (sceneModel.stageConfig.copy_id == CopyType.FootHold) {
                let fhModel = ModelManager.get(FootHoldModel)
                if (fhModel.pointDetailInfo.bossId > 0 && fhModel.pointDetailInfo.bossHp > 0) {
                    model.hp = fhModel.pointDetailInfo.bossHp
                }
            }
        }
        enemy.node.setPosition(pos);
        sceneModel.addFight(enemy);
        // ??????????????????
        if (model.camp == PveCampType.Enemy) {
            // ??????BOSS??????
            if (model.isBoss && sceneModel.battleInfoUtil) {
                sceneModel.battleInfoUtil.BossNum++;
            }
            // BOSS????????????
            if (!sceneModel.isDemo && model.config.present && !sceneModel.bossCommingIdx[id]) {
                // ????????????
                JumpUtils.pauseFight();
                gdk.panel.open(
                    model.isBoss ? PanelId.PveBossComming : PanelId.PveMonsterComming,
                    null, null,
                    {
                        args: [model.config]
                    }
                );
                sceneModel.bossCommingIdx[id] = true;
            }
            // ????????????BOSS??????????????????
            if (!sceneModel.isDemo && model.isBoss && (sceneModel.stageConfig.copy_id == CopyType.DoomsDay ||
                sceneModel.stageConfig.copy_id == CopyType.FootHold ||
                sceneModel.stageConfig.copy_id == CopyType.Eternal ||
                sceneModel.stageConfig.copy_id == CopyType.HeroTrial ||
                sceneModel.stageConfig.copy_id == CopyType.NewHeroTrial ||
                sceneModel.stageConfig.copy_id == CopyType.GuildBoss)) {
                let win = gdk.panel.get(PanelId.PveBossHpBar);
                if (win && win.active) {
                    // ???????????????????????????????????????
                    let ctrl = win.getComponent(PveBossHpBarPopupCtrl);
                    if (ctrl) {
                        ctrl.initEnemyInfo(model);
                    }
                    gdk.NodeTool.show(win);
                } else {
                    // ???????????????????????????????????????????????????
                    gdk.panel.open(
                        PanelId.PveBossHpBar,
                        null,
                        null,
                        {
                            args: model,
                            parent: sceneModel.ctrl.node.getChildByName('UI'),
                        },
                    );
                }
            }
            // ?????????BOSS??????????????????????????????
            if (sceneModel.stageConfig.copy_id == CopyType.NONE && model.isBoss) {
                let num = 0;
                // ????????????????????????????????????
                let len = sceneModel.curEnemies.length;
                num += len;
                sceneModel.maxEnemy -= len;
                sceneModel.curEnemies.length = 0;
                // ?????????????????????????????????
                len = sceneModel.arenaEnemies.length;
                num += len;
                sceneModel.maxEnemy -= len;
                sceneModel.arenaEnemies.length = 0;
                sceneModel.ctrl.updateEnemiesList(sceneModel.arenaEnemies);
                // ???????????????????????????
                len = sceneModel.enemies.length;
                num += len - 1;
                // ??????????????????
                let addHp = Math.ceil(model.config.hp * num * 0.03);
                model.config.hp += addHp;
                model._basePropTarget.hp = model.config.hp;
                model.hpMax = model.getProp('hp');
                model.hp = model.hpMax;
                // ????????????
                len > 1 && sceneModel.enemies.forEach(e => {
                    if (e === enemy) return;
                    let p = PveTool.getCenterPos(e.getPos(), e.getRect());
                    p = e.node.parent.convertToWorldSpaceAR(p);
                    p = sceneModel.ctrl.dropIconNode.convertToNodeSpaceAR(p);
                    let from = p;
                    // ??????
                    let to = cc.v2(p.x + MathUtil.rnd(20, 50), p.y + MathUtil.rnd(20, 50));
                    // ??????
                    let p2 = PveTool.getCenterPos(enemy.getPos(), enemy.getRect());
                    let end = cc.v2(p2.x + MathUtil.rnd(0, 10), p2.y + MathUtil.rnd(0, 10));
                    end = enemy.node.parent.convertToWorldSpaceAR(end);
                    end = sceneModel.ctrl.dropIconNode.convertToNodeSpaceAR(end);
                    // ??????
                    let n = PvePool.get(sceneModel.ctrl.energyItem) as cc.Node;
                    n.setPosition(p);
                    n.parent = sceneModel.ctrl.dropIconNode;
                    let dis = MathUtil.distance(from, to);
                    let width = to.x - from.x;
                    let param1 = 4.0
                    let param2 = 1.0
                    let pts: cc.Vec2[] = [
                        cc.v2(
                            width * (1 - param1 / 10),
                            dis * (1 - param1 / 10),
                        ),
                        cc.v2(
                            width * (1 - param2 / 10),
                            dis * (1 - param2 / 10),
                        ),
                        cc.v2(width, to.y - from.y),
                    ];
                    let speed = Math.max(1, sceneModel.timeScale);
                    let action: cc.Action = cc.speed(
                        cc.sequence(
                            cc.bezierBy(0.5, pts),
                            cc.delayTime(0.5 / MathUtil.rnd(1, len)),
                            cc.moveTo(0.8 + 0.8 / MathUtil.rnd(1, len), end),
                            cc.callFunc(() => {
                                PvePool.put(n);
                                // ???????????????
                                if (--len <= 1 && cc.isValid(enemy)) {
                                    enemy.showHurt(addHp, PveHurtType.RECOVER, 1, 0);
                                }
                            }),
                        ),
                        speed,
                    )
                    n.runAction(action);
                    // ????????????
                    e.model.owner_id = model.fightId;
                    e.model.hp = 0;
                });
            }
        }
    }

    /**
     * ???????????????
     * @param params 
     */
    createCaller(params: any[]) {
        let id: number = params[0],
            time: number = params[1],
            args: PveCallerArgs = params[2];
        let sceneModel = this.model;

        // ???????????????????????????
        if (args.owner) {
            let om = args.owner.model;
            let maxNum = om.getProp('call_maxNum');
            if (maxNum) {
                let curNum = sceneModel.getFightNumByBaseId(id);
                if (curNum >= maxNum) {
                    // ?????????????????????????????????????????????
                    return;
                }
            }
            // BUFF????????????????????????????????????
            let prop = om.prop;
            let oncall = prop.oncall;
            if (oncall != null && typeof oncall === 'object') {
                // ??????oncall??????????????????
                PveTool.evalBuffEvent(
                    oncall,
                    om.fightId,
                    prop,
                    om.ctrl,
                    om.ctrl,
                    {
                        a: prop,
                        t: prop,
                        am: om,
                        tm: om,
                    },
                );
            }
        }

        let node: cc.Node = PvePool.get(sceneModel.ctrl.calledPrefab);
        let call: PveCalledCtrl = node.getComponent(PveCalledCtrl);
        call.model = PvePool.get(PveCalledModel);
        call.model.time = Math.max(0, time);
        call.model.call_id = args.call_id;
        call.model.owner = args.owner;
        call.model.ctrl = call;
        call.model.id = id;
        if (args.config) {
            call.model._baseProp = null;
            call.model._tempProp = null;
            call.model.config = args.config;
            call.model.hpMax = args.config.hp;
            call.model.hp = call.model.hpMax;
        }
        call.sceneModel = sceneModel;
        call.setPosBy(args.pos, args.index, args.total);
        if (cc.js.isNumber(args.hp)) {
            call.model.hp = Math.min(args.hp, call.model.hpMax);
        }
        sceneModel.addFight(call);
        // ??????????????????
        if (args.args) {
            PveTool.evalBuffEvent(args.args, call.model.fightId, call.model.prop, call);
        }
        // ??????????????????
        if (args.ai === PveCalledAIType.OPPONENT_CALLED) {
            let sceneCtrl = sceneModel.ctrl;
            let skin = 'E_tongyongpugong';
            PveTool.createSpine(
                sceneCtrl.spineNodePrefab,
                sceneCtrl.effect,
                `spine/skill/${skin}/${skin}`,
                `atk_hit8`,
                false,
                Math.max(1, sceneModel.timeScale),
                (spine: sp.Skeleton, resId: string, res: sp.SkeletonData) => {
                    if (!cc.isValid(spine.node)) return;
                    // ???????????????spine??????
                    PveTool.clearSpine(spine);
                    PvePool.put(spine.node);
                },
                null,
                call.getPos(),
                true,
                true,
            );
        }
    }

    /**
     * ????????????
     * @param params 
     */
    createTrap(params: any[]) {
        let id: number = params[0],
            time: number = params[1],
            pos: cc.Vec2 = params[2],
            owner: PveFightCtrl = params[3],
            range: number = params[4];
        let sceneModel = this.model;
        let node: cc.Node = PvePool.get(sceneModel.ctrl.trapPrefab);
        let trap: PveTrapCtrl = node.getComponent(PveTrapCtrl);
        let model: PveTrapModel = trap.model = PvePool.get(PveTrapModel);
        model.time = time;
        model.owner = owner;
        model.ctrl = trap;
        model.id = id;
        if (range) {
            model.temRange = range;
        }
        if (model.config.type == 1 && owner instanceof PveEnemyCtrl) {
            let om = owner.model;
            let rodeList = om.targetPos ? [om.targetPos, ...om.road] : om.road.slice();
            model.monsterRoad = rodeList.concat();
            model.monsterRoadIndex = om.roadIndex;
        }
        trap.sceneModel = sceneModel;
        trap.node.setPosition(pos);
        trap.initBoxSize();
        // ???????????????????????????
        let manager = cc.director.getCollisionManager();
        if (!manager.enabled && model.config.range_type == 2) {
            manager.enabled = true;
        }
        sceneModel.addFight(trap);
    }

    /**
     * ???????????????
     * @param params 
     */
    createGate(params: any[]) {
        let flag: string = params[0],
            id: number = params[1],
            time: number = params[2],
            pos: cc.Vec2 = params[3],
            owner: PveFightCtrl = params[4],
            args: any[] = params[5];
        let sceneModel = this.model;
        let node: cc.Node = PvePool.get(sceneModel.ctrl.gatePrefab);
        let gate: PveGateCtrl = node.getComponent(PveGateCtrl);
        let model: PveGateModel = gate.model = PvePool.get(PveGateModel);
        model.flag = flag;
        model.time = time;
        model.mode = args[0];
        model.percent = cc.js.isNumber(args[1]) ? [args[1]] : args[1];
        model.road = args[2] || -1;
        model.owner = owner;
        model.ctrl = gate;
        model.id = id;
        gate.sceneModel = sceneModel;
        if (args[3] instanceof Array) {
            // ???????????????????????????????????????
            gate.node.setPosition(args[3][0], args[3][1]);
        } else {
            // ???????????????????????????
            gate.node.setPosition(pos);
        }
        // ???????????????????????????
        let manager = cc.director.getCollisionManager();
        if (!manager.enabled && model.config.range_type == 2) {
            manager.enabled = true;
        }
        sceneModel.addFight(gate);
    }

    onExit() {
        super.onExit();
        this.spawnDic = null;
        gdk.e.targetOff(this);
    }
}