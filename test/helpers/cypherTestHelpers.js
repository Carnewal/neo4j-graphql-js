import {
  cypherQuery,
  cypherMutation,
  augmentSchema,
  augmentTypeDefs
} from '../../dist/index';
import { printTypeMap, extractTypeMapFromTypeDefs } from '../../dist/utils';
import { augmentTypeMap } from '../../dist/augment';
import { graphql } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { testSchema } from './testSchema';

export function cypherTestRunner(
  t,
  graphqlQuery,
  graphqlParams,
  expectedCypherQuery,
  expectedCypherParams
) {
  const testMovieSchema =
    testSchema +
    `
type Mutation {
    CreateGenre(name: String): Genre @cypher(statement: "CREATE (g:Genre) SET g.name = $name RETURN g")
    CreateMovie(movieId: ID, title: String, year: Int, plot: String, poster: String, imdbRating: Float): Movie
    CreateState(name: String!): State
    UpdateMovie(movieId: ID!, title: String, year: Int, plot: String, poster: String, imdbRating: Float): Movie
    DeleteMovie(movieId: ID!): Movie
}
`;

  const resolvers = {
    Query: {
      Movie(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherQuery(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
      },
      MoviesByYear(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherQuery(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
      },
      MoviesByYears(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherQuery(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
      },
      MovieById(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherQuery(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
      },
      MovieBy_Id(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherQuery(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
      },
      GenresBySubstring(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherQuery(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
      },
      Books(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherQuery(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
      },
      State(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherQuery(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
      }
    },
    Mutation: {
      CreateGenre(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherMutation(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
        t.end();
      },
      CreateMovie(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherMutation(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
        t.end();
      },
      CreateState(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherMutation(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
        t.end();
      },
      UpdateMovie(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherMutation(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
        t.end();
      },
      DeleteMovie(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherMutation(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
        t.end();
      }
    }
  };

  const schema = makeExecutableSchema({
    typeDefs: augmentTypeDefs(testMovieSchema),
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false
    }
  });

  // query the test schema with the test query, assertion is in the resolver
  return graphql(schema, graphqlQuery, null, null, graphqlParams);
}

// Optimization to prevent schema augmentation from running for every test
const typeMap = extractTypeMapFromTypeDefs(testSchema);
const augmentedTypeMap = augmentTypeMap(typeMap, {
  // These custom field resolvers exist only for generating
  // @neo4j_ignore directives used in a few tests
  Movie: {
    customField(object, params, ctx, resolveInfo) {
      return '';
    }
  },
  State: {
    customField(object, params, ctx, resolveInfo) {
      return '';
    }
  }
});
const augmentedSchemaCypherTestRunnerTypeDefs = printTypeMap(augmentedTypeMap);

export function augmentedSchemaCypherTestRunner(
  t,
  graphqlQuery,
  graphqlParams,
  expectedCypherQuery
) {
  const resolvers = {
    Query: {
      User(object, params, ctx, resolveInfo) {
        let [query, queryParams] = cypherQuery(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
      },
      Movie(object, params, ctx, resolveInfo) {
        let [query, queryParams] = cypherQuery(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
      },
      MoviesByYear(object, params, ctx, resolveInfo) {
        let [query, queryParams] = cypherQuery(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
      },
      MoviesByYears(object, params, ctx, resolveInfo) {
        let [query, queryParams] = cypherQuery(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
      },
      MovieById(object, params, ctx, resolveInfo) {
        let [query, queryParams] = cypherQuery(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
      },
      MovieBy_Id(object, params, ctx, resolveInfo) {
        let [query, queryParams] = cypherQuery(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
      },
      GenresBySubstring(object, params, ctx, resolveInfo) {
        let [query, queryParams] = cypherQuery(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
      },
      Book(object, params, ctx, resolveInfo) {
        let [query, queryParams] = cypherQuery(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
      },
      Books(object, params, ctx, resolveInfo) {
        let [query, queryParams] = cypherQuery(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
      },
      TemporalNode(object, params, ctx, resolveInfo) {
        let [query, queryParams] = cypherQuery(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
      },
      State(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherQuery(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
      }
    },
    Mutation: {
      CreateMovie(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherMutation(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
        t.end();
      },
      CreateState(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherMutation(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
        t.end();
      },
      CreateTemporalNode(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherMutation(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
        t.end();
      },
      UpdateTemporalNode(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherMutation(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
        t.end();
      },
      DeleteTemporalNode(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherMutation(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
        t.end();
      },
      AddTemporalNodeTemporalNodes(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherMutation(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
        t.end();
      },
      RemoveTemporalNodeTemporalNodes(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherMutation(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
        t.end();
      },
      AddMovieGenres(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherMutation(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
        t.end();
      },
      RemoveMovieGenres(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherMutation(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
        t.end();
      },
      AddUserRated(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherMutation(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
        t.end();
      },
      RemoveUserRated(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherMutation(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
        t.end();
      },
      AddUserFriends(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherMutation(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
        t.end();
      },
      RemoveUserFriends(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherMutation(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
        t.end();
      }
    }
  };

  const augmentedSchema = makeExecutableSchema({
    typeDefs: augmentedSchemaCypherTestRunnerTypeDefs,
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false
    }
  });

  return graphql(augmentedSchema, graphqlQuery, null, null, graphqlParams);
}

const augmentedSchemaTypeDefs = augmentTypeDefs(testSchema);

export function augmentedSchema() {
  const schema = makeExecutableSchema({
    typeDefs: augmentedSchemaTypeDefs,
    resolvers: {
      Movie: {
        customField(object, params, ctx, resolveInfo) {
          return '';
        }
      },
      State: {
        customField(object, params, ctx, resolveInfo) {
          return '';
        }
      }
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    }
  });
  return augmentSchema(schema);
}
