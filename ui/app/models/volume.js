import { computed } from '@ember/object';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default class Volume extends Model {
  @attr('string') plainId;
  @attr('string') name;

  @belongsTo('namespace') namespace;
  @belongsTo('plugin') plugin;

  @hasMany('allocation') writeAllocations;
  @hasMany('allocation') readAllocations;

  @computed('writeAllocations.[]', 'readAllocations.[]')
  get allocations() {
    return [...this.writeAllocations.toArray(), ...this.readAllocations.toArray()];
  }

  @attr('string') externalId;
  @attr() topologies;
  @attr('string') accessMode;
  @attr('string') attachmentMode;
  @attr('boolean') schedulable;
  @attr('string') provider;
  @attr('string') version;

  @attr('boolean') controllerRequired;
  @attr('number') controllersHealthy;
  @attr('number') controllersExpected;

  @computed('controllersHealthy', 'controllersExpected')
  get controllersHealthyProportion() {
    return this.controllersHealthy / this.controllersExpected;
  }

  @attr('number') nodesHealthy;
  @attr('number') nodesExpected;

  @computed('nodesHealthy', 'nodesExpected')
  get nodesHealthyProportion() {
    return this.nodesHealthy / this.nodesExpected;
  }

  @attr('number') resourceExhausted;
  @attr('number') createIndex;
  @attr('number') modifyIndex;
}