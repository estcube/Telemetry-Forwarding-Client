import { variableAdapters } from '../adapters';
import { createQueryVariableAdapter } from './adapter';
import { reduxTester } from '../../../../test/core/redux/reduxTester';
import { getRootReducer } from '../state/helpers';
import { QueryVariableModel, VariableHide, VariableRefresh, VariableSort } from '../types';
import { ALL_VARIABLE_TEXT, ALL_VARIABLE_VALUE, toVariablePayload } from '../state/types';
import { addVariable, changeVariableProp, setCurrentVariableValue } from '../state/sharedReducer';
import { TemplatingState } from '../state/reducers';
import {
  changeQueryVariableDataSource,
  changeQueryVariableQuery,
  initQueryVariableEditor,
  updateQueryVariableOptions,
} from './actions';
import { updateVariableOptions, updateVariableTags } from './reducer';
import {
  addVariableEditorError,
  changeVariableEditorExtended,
  removeVariableEditorError,
  setIdInEditor,
} from '../editor/reducer';
import DefaultVariableQueryEditor from '../editor/DefaultVariableQueryEditor';
import { expect } from 'test/lib/common';

const mocks: Record<string, any> = {
  datasource: {
    metricFindQuery: jest.fn().mockResolvedValue([]),
  },
  datasourceSrv: {
    getMetricSources: jest.fn().mockReturnValue([]),
  },
  pluginLoader: {
    importDataSourcePlugin: jest.fn().mockResolvedValue({ components: {} }),
  },
};

jest.mock('../../plugins/datasource_srv', () => ({
  getDatasourceSrv: jest.fn(() => ({
    get: jest.fn((name: string) => mocks[name]),
    getMetricSources: () => mocks.datasourceSrv.getMetricSources(),
  })),
}));

jest.mock('../../plugins/plugin_loader', () => ({
  importDataSourcePlugin: () => mocks.pluginLoader.importDataSourcePlugin(),
}));

jest.mock('../../templating/template_srv', () => ({
  replace: jest.fn().mockReturnValue(''),
}));

describe('query actions', () => {
  variableAdapters.setInit(() => [createQueryVariableAdapter()]);

  describe('when updateQueryVariableOptions is dispatched for variable with tags and includeAll', () => {
    it('then correct actions are dispatched', async () => {
      const variable = createVariable({ includeAll: true });
      const optionsMetrics = [createMetric('A'), createMetric('B')];
      const tagsMetrics = [createMetric('tagA'), createMetric('tagB')];

      mockDatasourceMetrics(variable, optionsMetrics, tagsMetrics);

      const tester = await reduxTester<{ templating: TemplatingState }>()
        .givenRootReducer(getRootReducer())
        .whenActionIsDispatched(addVariable(toVariablePayload(variable, { global: false, index: 0, model: variable })))
        .whenAsyncActionIsDispatched(updateQueryVariableOptions(toVariablePayload(variable)), true);

      const option = createOption(ALL_VARIABLE_TEXT, ALL_VARIABLE_VALUE);
      const update = { results: optionsMetrics, templatedRegex: '' };

      tester.thenDispatchedActionsPredicateShouldEqual(actions => {
        const [updateOptions, updateTags, setCurrentAction] = actions;
        const expectedNumberOfActions = 3;

        expect(updateOptions).toEqual(updateVariableOptions(toVariablePayload(variable, update)));
        expect(updateTags).toEqual(updateVariableTags(toVariablePayload(variable, tagsMetrics)));
        expect(setCurrentAction).toEqual(setCurrentVariableValue(toVariablePayload(variable, { option })));
        return actions.length === expectedNumberOfActions;
      });
    });
  });

  describe('when updateQueryVariableOptions is dispatched for variable with tags', () => {
    it('then correct actions are dispatched', async () => {
      const variable = createVariable({ includeAll: false });
      const optionsMetrics = [createMetric('A'), createMetric('B')];
      const tagsMetrics = [createMetric('tagA'), createMetric('tagB')];

      mockDatasourceMetrics(variable, optionsMetrics, tagsMetrics);

      const tester = await reduxTester<{ templating: TemplatingState }>()
        .givenRootReducer(getRootReducer())
        .whenActionIsDispatched(addVariable(toVariablePayload(variable, { global: false, index: 0, model: variable })))
        .whenAsyncActionIsDispatched(updateQueryVariableOptions(toVariablePayload(variable)), true);

      const option = createOption('A');
      const update = { results: optionsMetrics, templatedRegex: '' };

      tester.thenDispatchedActionsPredicateShouldEqual(actions => {
        const [updateOptions, updateTags, setCurrentAction] = actions;
        const expectedNumberOfActions = 3;

        expect(updateOptions).toEqual(updateVariableOptions(toVariablePayload(variable, update)));
        expect(updateTags).toEqual(updateVariableTags(toVariablePayload(variable, tagsMetrics)));
        expect(setCurrentAction).toEqual(setCurrentVariableValue(toVariablePayload(variable, { option })));
        return actions.length === expectedNumberOfActions;
      });
    });
  });

  describe('when updateQueryVariableOptions is dispatched for variable without both tags and includeAll', () => {
    it('then correct actions are dispatched', async () => {
      const variable = createVariable({ includeAll: false, useTags: false });
      const optionsMetrics = [createMetric('A'), createMetric('B')];

      mockDatasourceMetrics(variable, optionsMetrics, []);

      const tester = await reduxTester<{ templating: TemplatingState }>()
        .givenRootReducer(getRootReducer())
        .whenActionIsDispatched(addVariable(toVariablePayload(variable, { global: false, index: 0, model: variable })))
        .whenAsyncActionIsDispatched(updateQueryVariableOptions(toVariablePayload(variable)), true);

      const option = createOption('A');
      const update = { results: optionsMetrics, templatedRegex: '' };

      tester.thenDispatchedActionsPredicateShouldEqual(actions => {
        const [updateOptions, setCurrentAction] = actions;
        const expectedNumberOfActions = 2;

        expect(updateOptions).toEqual(updateVariableOptions(toVariablePayload(variable, update)));
        expect(setCurrentAction).toEqual(setCurrentVariableValue(toVariablePayload(variable, { option })));
        return actions.length === expectedNumberOfActions;
      });
    });
  });

  describe('when updateQueryVariableOptions is dispatched for variable with includeAll but without tags', () => {
    it('then correct actions are dispatched', async () => {
      const variable = createVariable({ includeAll: true, useTags: false });
      const optionsMetrics = [createMetric('A'), createMetric('B')];

      mockDatasourceMetrics(variable, optionsMetrics, []);

      const tester = await reduxTester<{ templating: TemplatingState }>()
        .givenRootReducer(getRootReducer())
        .whenActionIsDispatched(addVariable(toVariablePayload(variable, { global: false, index: 0, model: variable })))
        .whenAsyncActionIsDispatched(updateQueryVariableOptions(toVariablePayload(variable)), true);

      const option = createOption(ALL_VARIABLE_TEXT, ALL_VARIABLE_VALUE);
      const update = { results: optionsMetrics, templatedRegex: '' };

      tester.thenDispatchedActionsPredicateShouldEqual(actions => {
        const [updateOptions, setCurrentAction] = actions;
        const expectedNumberOfActions = 2;

        expect(updateOptions).toEqual(updateVariableOptions(toVariablePayload(variable, update)));
        expect(setCurrentAction).toEqual(setCurrentVariableValue(toVariablePayload(variable, { option })));
        return actions.length === expectedNumberOfActions;
      });
    });
  });

  describe('when updateQueryVariableOptions is dispatched for variable open in editor', () => {
    it('then correct actions are dispatched', async () => {
      const variable = createVariable({ includeAll: true, useTags: false });
      const optionsMetrics = [createMetric('A'), createMetric('B')];

      mockDatasourceMetrics(variable, optionsMetrics, []);

      const tester = await reduxTester<{ templating: TemplatingState }>()
        .givenRootReducer(getRootReducer())
        .whenActionIsDispatched(addVariable(toVariablePayload(variable, { global: false, index: 0, model: variable })))
        .whenActionIsDispatched(setIdInEditor({ id: variable.id }))
        .whenAsyncActionIsDispatched(updateQueryVariableOptions(toVariablePayload(variable)), true);

      const option = createOption(ALL_VARIABLE_TEXT, ALL_VARIABLE_VALUE);
      const update = { results: optionsMetrics, templatedRegex: '' };

      tester.thenDispatchedActionsPredicateShouldEqual(actions => {
        const [clearErrors, updateOptions, setCurrentAction] = actions;
        const expectedNumberOfActions = 3;

        expect(clearErrors).toEqual(removeVariableEditorError({ errorProp: 'update' }));
        expect(updateOptions).toEqual(updateVariableOptions(toVariablePayload(variable, update)));
        expect(setCurrentAction).toEqual(setCurrentVariableValue(toVariablePayload(variable, { option })));
        return actions.length === expectedNumberOfActions;
      });
    });
  });

  describe('when updateQueryVariableOptions is dispatched for variable with searchFilter', () => {
    it('then correct actions are dispatched', async () => {
      const variable = createVariable({ includeAll: true, useTags: false });
      const optionsMetrics = [createMetric('A'), createMetric('B')];

      mockDatasourceMetrics(variable, optionsMetrics, []);

      const tester = await reduxTester<{ templating: TemplatingState }>()
        .givenRootReducer(getRootReducer())
        .whenActionIsDispatched(addVariable(toVariablePayload(variable, { global: false, index: 0, model: variable })))
        .whenActionIsDispatched(setIdInEditor({ id: variable.id }))
        .whenAsyncActionIsDispatched(updateQueryVariableOptions(toVariablePayload(variable), 'search'), true);

      const update = { results: optionsMetrics, templatedRegex: '' };

      tester.thenDispatchedActionsPredicateShouldEqual(actions => {
        const [clearErrors, updateOptions] = actions;
        const expectedNumberOfActions = 2;

        expect(clearErrors).toEqual(removeVariableEditorError({ errorProp: 'update' }));
        expect(updateOptions).toEqual(updateVariableOptions(toVariablePayload(variable, update)));
        return actions.length === expectedNumberOfActions;
      });
    });
  });

  describe('when updateQueryVariableOptions is dispatched and fails for variable open in editor', () => {
    it('then correct actions are dispatched', async () => {
      const variable = createVariable({ includeAll: true, useTags: false });
      const error = { message: 'failed to fetch metrics' };

      mocks[variable.datasource!].metricFindQuery = jest.fn(() => Promise.reject(error));

      const tester = await reduxTester<{ templating: TemplatingState }>()
        .givenRootReducer(getRootReducer())
        .whenActionIsDispatched(addVariable(toVariablePayload(variable, { global: false, index: 0, model: variable })))
        .whenActionIsDispatched(setIdInEditor({ id: variable.id }))
        .whenAsyncActionIsDispatched(updateQueryVariableOptions(toVariablePayload(variable)), true);

      tester.thenDispatchedActionsPredicateShouldEqual(actions => {
        const [clearErrors, errorOccurred] = actions;
        const expectedNumberOfActions = 2;

        expect(errorOccurred).toEqual(addVariableEditorError({ errorProp: 'update', errorText: error.message }));
        expect(clearErrors).toEqual(removeVariableEditorError({ errorProp: 'update' }));
        return actions.length === expectedNumberOfActions;
      });
    });
  });

  describe('when initQueryVariableEditor is dispatched', () => {
    it('then correct actions are dispatched', async () => {
      const variable = createVariable({ includeAll: true, useTags: false });
      const defaultMetricSource = { name: '', value: '', meta: {}, sort: '' };
      const testMetricSource = { name: 'test', value: 'test', meta: {}, sort: '' };
      const editor = {};

      mocks.datasourceSrv.getMetricSources = jest.fn().mockReturnValue([testMetricSource]);
      mocks.pluginLoader.importDataSourcePlugin = jest.fn().mockResolvedValue({
        components: { VariableQueryEditor: editor },
      });

      const tester = await reduxTester<{ templating: TemplatingState }>()
        .givenRootReducer(getRootReducer())
        .whenActionIsDispatched(addVariable(toVariablePayload(variable, { global: false, index: 0, model: variable })))
        .whenAsyncActionIsDispatched(initQueryVariableEditor(toVariablePayload(variable)), true);

      tester.thenDispatchedActionsPredicateShouldEqual(actions => {
        const [updateDatasources, setDatasource, setEditor] = actions;
        const expectedNumberOfActions = 3;

        expect(updateDatasources).toEqual(
          changeVariableEditorExtended({ propName: 'dataSources', propValue: [defaultMetricSource, testMetricSource] })
        );
        expect(setDatasource).toEqual(
          changeVariableEditorExtended({ propName: 'dataSource', propValue: mocks['datasource'] })
        );
        expect(setEditor).toEqual(changeVariableEditorExtended({ propName: 'VariableQueryEditor', propValue: editor }));
        return actions.length === expectedNumberOfActions;
      });
    });
  });

  describe('when initQueryVariableEditor is dispatched and metricsource without value is available', () => {
    it('then correct actions are dispatched', async () => {
      const variable = createVariable({ includeAll: true, useTags: false });
      const defaultMetricSource = { name: '', value: '', meta: {}, sort: '' };
      const testMetricSource = { name: 'test', value: (null as unknown) as string, meta: {}, sort: '' };
      const editor = {};

      mocks.datasourceSrv.getMetricSources = jest.fn().mockReturnValue([testMetricSource]);
      mocks.pluginLoader.importDataSourcePlugin = jest.fn().mockResolvedValue({
        components: { VariableQueryEditor: editor },
      });

      const tester = await reduxTester<{ templating: TemplatingState }>()
        .givenRootReducer(getRootReducer())
        .whenActionIsDispatched(addVariable(toVariablePayload(variable, { global: false, index: 0, model: variable })))
        .whenAsyncActionIsDispatched(initQueryVariableEditor(toVariablePayload(variable)), true);

      tester.thenDispatchedActionsPredicateShouldEqual(actions => {
        const [updateDatasources, setDatasource, setEditor] = actions;
        const expectedNumberOfActions = 3;

        expect(updateDatasources).toEqual(
          changeVariableEditorExtended({ propName: 'dataSources', propValue: [defaultMetricSource] })
        );
        expect(setDatasource).toEqual(
          changeVariableEditorExtended({ propName: 'dataSource', propValue: mocks['datasource'] })
        );
        expect(setEditor).toEqual(changeVariableEditorExtended({ propName: 'VariableQueryEditor', propValue: editor }));
        return actions.length === expectedNumberOfActions;
      });
    });
  });

  describe('when initQueryVariableEditor is dispatched and no metric sources was found', () => {
    it('then correct actions are dispatched', async () => {
      const variable = createVariable({ includeAll: true, useTags: false });
      const defaultDatasource = { name: '', value: '', meta: {}, sort: '' };
      const editor = {};

      mocks.datasourceSrv.getMetricSources = jest.fn().mockReturnValue([]);
      mocks.pluginLoader.importDataSourcePlugin = jest.fn().mockResolvedValue({
        components: { VariableQueryEditor: editor },
      });

      const tester = await reduxTester<{ templating: TemplatingState }>()
        .givenRootReducer(getRootReducer())
        .whenActionIsDispatched(addVariable(toVariablePayload(variable, { global: false, index: 0, model: variable })))
        .whenAsyncActionIsDispatched(initQueryVariableEditor(toVariablePayload(variable)), true);

      tester.thenDispatchedActionsPredicateShouldEqual(actions => {
        const [updateDatasources, setDatasource, setEditor] = actions;
        const expectedNumberOfActions = 3;

        expect(updateDatasources).toEqual(
          changeVariableEditorExtended({ propName: 'dataSources', propValue: [defaultDatasource] })
        );
        expect(setDatasource).toEqual(
          changeVariableEditorExtended({ propName: 'dataSource', propValue: mocks['datasource'] })
        );
        expect(setEditor).toEqual(changeVariableEditorExtended({ propName: 'VariableQueryEditor', propValue: editor }));
        return actions.length === expectedNumberOfActions;
      });
    });
  });

  describe('when initQueryVariableEditor is dispatched and variable dont have datasource', () => {
    it('then correct actions are dispatched', async () => {
      const variable = createVariable({ datasource: undefined });
      const ds = { name: '', value: '', meta: {}, sort: '' };

      const tester = await reduxTester<{ templating: TemplatingState }>()
        .givenRootReducer(getRootReducer())
        .whenActionIsDispatched(addVariable(toVariablePayload(variable, { global: false, index: 0, model: variable })))
        .whenAsyncActionIsDispatched(initQueryVariableEditor(toVariablePayload(variable)), true);

      tester.thenDispatchedActionsPredicateShouldEqual(actions => {
        const [updateDatasources] = actions;
        const expectedNumberOfActions = 1;

        expect(updateDatasources).toEqual(changeVariableEditorExtended({ propName: 'dataSources', propValue: [ds] }));
        return actions.length === expectedNumberOfActions;
      });
    });
  });

  describe('when changeQueryVariableDataSource is dispatched', () => {
    it('then correct actions are dispatched', async () => {
      const variable = createVariable({ datasource: 'other' });
      const editor = {};

      mocks.pluginLoader.importDataSourcePlugin = jest.fn().mockResolvedValue({
        components: { VariableQueryEditor: editor },
      });

      const tester = await reduxTester<{ templating: TemplatingState }>()
        .givenRootReducer(getRootReducer())
        .whenActionIsDispatched(addVariable(toVariablePayload(variable, { global: false, index: 0, model: variable })))
        .whenAsyncActionIsDispatched(changeQueryVariableDataSource(toVariablePayload(variable), 'datasource'), true);

      tester.thenDispatchedActionsPredicateShouldEqual(actions => {
        const [updateDatasource, updateEditor] = actions;
        const expectedNumberOfActions = 2;

        expect(updateDatasource).toEqual(
          changeVariableEditorExtended({ propName: 'dataSource', propValue: mocks.datasource })
        );
        expect(updateEditor).toEqual(
          changeVariableEditorExtended({ propName: 'VariableQueryEditor', propValue: editor })
        );

        return actions.length === expectedNumberOfActions;
      });
    });
  });

  describe('when changeQueryVariableDataSource is dispatched and editor is not configured', () => {
    it('then correct actions are dispatched', async () => {
      const variable = createVariable({ datasource: 'other' });
      const editor = DefaultVariableQueryEditor;

      mocks.pluginLoader.importDataSourcePlugin = jest.fn().mockResolvedValue({
        components: {},
      });

      const tester = await reduxTester<{ templating: TemplatingState }>()
        .givenRootReducer(getRootReducer())
        .whenActionIsDispatched(addVariable(toVariablePayload(variable, { global: false, index: 0, model: variable })))
        .whenAsyncActionIsDispatched(changeQueryVariableDataSource(toVariablePayload(variable), 'datasource'), true);

      tester.thenDispatchedActionsPredicateShouldEqual(actions => {
        const [updateDatasource, updateEditor] = actions;
        const expectedNumberOfActions = 2;

        expect(updateDatasource).toEqual(
          changeVariableEditorExtended({ propName: 'dataSource', propValue: mocks.datasource })
        );
        expect(updateEditor).toEqual(
          changeVariableEditorExtended({ propName: 'VariableQueryEditor', propValue: editor })
        );

        return actions.length === expectedNumberOfActions;
      });
    });
  });

  describe('when changeQueryVariableQuery is dispatched', () => {
    it('then correct actions are dispatched', async () => {
      const optionsMetrics = [createMetric('A'), createMetric('B')];
      const tagsMetrics = [createMetric('tagA'), createMetric('tagB')];
      const variable = createVariable({ datasource: 'datasource', useTags: true, includeAll: true });

      const query = '$datasource';
      const definition = 'depends on datasource variable';

      mockDatasourceMetrics({ ...variable, query }, optionsMetrics, tagsMetrics);

      const tester = await reduxTester<{ templating: TemplatingState }>()
        .givenRootReducer(getRootReducer())
        .whenActionIsDispatched(addVariable(toVariablePayload(variable, { global: false, index: 0, model: variable })))
        .whenAsyncActionIsDispatched(changeQueryVariableQuery(toVariablePayload(variable), query, definition), true);

      const option = createOption(ALL_VARIABLE_TEXT, ALL_VARIABLE_VALUE);
      const update = { results: optionsMetrics, templatedRegex: '' };

      tester.thenDispatchedActionsPredicateShouldEqual(actions => {
        const [clearError, changeQuery, changeDefinition, updateOptions, updateTags, setOption] = actions;
        const expectedNumberOfActions = 6;

        expect(clearError).toEqual(removeVariableEditorError({ errorProp: 'query' }));
        expect(changeQuery).toEqual(
          changeVariableProp(toVariablePayload(variable, { propName: 'query', propValue: query }))
        );
        expect(changeDefinition).toEqual(
          changeVariableProp(toVariablePayload(variable, { propName: 'definition', propValue: definition }))
        );
        expect(updateOptions).toEqual(updateVariableOptions(toVariablePayload(variable, update)));
        expect(updateTags).toEqual(updateVariableTags(toVariablePayload(variable, tagsMetrics)));
        expect(setOption).toEqual(setCurrentVariableValue(toVariablePayload(variable, { option })));

        return actions.length === expectedNumberOfActions;
      });
    });
  });

  describe('when changeQueryVariableQuery is dispatched for variable without tags', () => {
    it('then correct actions are dispatched', async () => {
      const optionsMetrics = [createMetric('A'), createMetric('B')];
      const variable = createVariable({ datasource: 'datasource', useTags: false, includeAll: true });

      const query = '$datasource';
      const definition = 'depends on datasource variable';

      mockDatasourceMetrics({ ...variable, query }, optionsMetrics, []);

      const tester = await reduxTester<{ templating: TemplatingState }>()
        .givenRootReducer(getRootReducer())
        .whenActionIsDispatched(addVariable(toVariablePayload(variable, { global: false, index: 0, model: variable })))
        .whenAsyncActionIsDispatched(changeQueryVariableQuery(toVariablePayload(variable), query, definition), true);

      const option = createOption(ALL_VARIABLE_TEXT, ALL_VARIABLE_VALUE);
      const update = { results: optionsMetrics, templatedRegex: '' };

      tester.thenDispatchedActionsPredicateShouldEqual(actions => {
        const [clearError, changeQuery, changeDefinition, updateOptions, setOption] = actions;
        const expectedNumberOfActions = 5;

        expect(clearError).toEqual(removeVariableEditorError({ errorProp: 'query' }));
        expect(changeQuery).toEqual(
          changeVariableProp(toVariablePayload(variable, { propName: 'query', propValue: query }))
        );
        expect(changeDefinition).toEqual(
          changeVariableProp(toVariablePayload(variable, { propName: 'definition', propValue: definition }))
        );
        expect(updateOptions).toEqual(updateVariableOptions(toVariablePayload(variable, update)));
        expect(setOption).toEqual(setCurrentVariableValue(toVariablePayload(variable, { option })));

        return actions.length === expectedNumberOfActions;
      });
    });
  });

  describe('when changeQueryVariableQuery is dispatched for variable without tags and all', () => {
    it('then correct actions are dispatched', async () => {
      const optionsMetrics = [createMetric('A'), createMetric('B')];
      const variable = createVariable({ datasource: 'datasource', useTags: false, includeAll: false });
      const query = '$datasource';
      const definition = 'depends on datasource variable';

      mockDatasourceMetrics({ ...variable, query }, optionsMetrics, []);

      const tester = await reduxTester<{ templating: TemplatingState }>()
        .givenRootReducer(getRootReducer())
        .whenActionIsDispatched(addVariable(toVariablePayload(variable, { global: false, index: 0, model: variable })))
        .whenAsyncActionIsDispatched(changeQueryVariableQuery(toVariablePayload(variable), query, definition), true);

      const option = createOption('A');
      const update = { results: optionsMetrics, templatedRegex: '' };

      tester.thenDispatchedActionsPredicateShouldEqual(actions => {
        const [clearError, changeQuery, changeDefinition, updateOptions, setOption] = actions;
        const expectedNumberOfActions = 5;

        expect(clearError).toEqual(removeVariableEditorError({ errorProp: 'query' }));
        expect(changeQuery).toEqual(
          changeVariableProp(toVariablePayload(variable, { propName: 'query', propValue: query }))
        );
        expect(changeDefinition).toEqual(
          changeVariableProp(toVariablePayload(variable, { propName: 'definition', propValue: definition }))
        );
        expect(updateOptions).toEqual(updateVariableOptions(toVariablePayload(variable, update)));
        expect(setOption).toEqual(setCurrentVariableValue(toVariablePayload(variable, { option })));

        return actions.length === expectedNumberOfActions;
      });
    });
  });

  describe('when changeQueryVariableQuery is dispatched with invalid query', () => {
    it('then correct actions are dispatched', async () => {
      const variable = createVariable({ datasource: 'datasource', useTags: false, includeAll: false });
      const query = `$${variable.name}`;
      const definition = 'depends on datasource variable';

      const tester = await reduxTester<{ templating: TemplatingState }>()
        .givenRootReducer(getRootReducer())
        .whenActionIsDispatched(addVariable(toVariablePayload(variable, { global: false, index: 0, model: variable })))
        .whenAsyncActionIsDispatched(changeQueryVariableQuery(toVariablePayload(variable), query, definition), true);

      const errorText = 'Query cannot contain a reference to itself. Variable: $' + variable.name;

      tester.thenDispatchedActionsPredicateShouldEqual(actions => {
        const [editorError] = actions;
        const expectedNumberOfActions = 1;

        expect(editorError).toEqual(addVariableEditorError({ errorProp: 'query', errorText }));
        return actions.length === expectedNumberOfActions;
      });
    });
  });
});

function mockDatasourceMetrics(variable: QueryVariableModel, optionsMetrics: any[], tagsMetrics: any[]) {
  const metrics: Record<string, any[]> = {
    [variable.query]: optionsMetrics,
    [variable.tagsQuery]: tagsMetrics,
  };

  const { metricFindQuery } = mocks[variable.datasource!];

  metricFindQuery.mockReset();
  metricFindQuery.mockImplementation((query: string) => Promise.resolve(metrics[query] ?? []));
}

function createVariable(extend?: Partial<QueryVariableModel>): QueryVariableModel {
  return {
    type: 'query',
    id: '0',
    global: false,
    current: createOption(''),
    options: [],
    query: 'options-query',
    name: 'Constant',
    label: '',
    hide: VariableHide.dontHide,
    skipUrlSync: false,
    index: 0,
    datasource: 'datasource',
    definition: '',
    sort: VariableSort.alphabeticalAsc,
    tags: [],
    tagsQuery: 'tags-query',
    tagValuesQuery: '',
    useTags: true,
    refresh: VariableRefresh.onDashboardLoad,
    regex: '',
    multi: true,
    includeAll: true,
    ...(extend ?? {}),
  };
}

function createOption(text: string, value?: string) {
  const metric = createMetric(text);
  return {
    ...metric,
    value: value ?? metric.text,
    selected: false,
  };
}

function createMetric(value: string) {
  return {
    text: value,
  };
}
