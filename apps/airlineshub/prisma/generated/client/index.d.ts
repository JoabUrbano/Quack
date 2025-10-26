
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Airline
 * 
 */
export type Airline = $Result.DefaultSelection<Prisma.$AirlinePayload>
/**
 * Model Flight
 * 
 */
export type Flight = $Result.DefaultSelection<Prisma.$FlightPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const FlightStatus: {
  SCHEDULED: 'SCHEDULED',
  DEPARTED: 'DEPARTED',
  ARRIVED: 'ARRIVED',
  DELAYED: 'DELAYED',
  CANCELLED: 'CANCELLED'
};

export type FlightStatus = (typeof FlightStatus)[keyof typeof FlightStatus]

}

export type FlightStatus = $Enums.FlightStatus

export const FlightStatus: typeof $Enums.FlightStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Airlines
 * const airlines = await prisma.airline.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Airlines
   * const airlines = await prisma.airline.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.airline`: Exposes CRUD operations for the **Airline** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Airlines
    * const airlines = await prisma.airline.findMany()
    * ```
    */
  get airline(): Prisma.AirlineDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.flight`: Exposes CRUD operations for the **Flight** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Flights
    * const flights = await prisma.flight.findMany()
    * ```
    */
  get flight(): Prisma.FlightDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.18.0
   * Query Engine version: 34b5a692b7bd79939a9a2c3ef97d816e749cda2f
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Airline: 'Airline',
    Flight: 'Flight'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "airline" | "flight"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Airline: {
        payload: Prisma.$AirlinePayload<ExtArgs>
        fields: Prisma.AirlineFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AirlineFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlinePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AirlineFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlinePayload>
          }
          findFirst: {
            args: Prisma.AirlineFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlinePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AirlineFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlinePayload>
          }
          findMany: {
            args: Prisma.AirlineFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlinePayload>[]
          }
          create: {
            args: Prisma.AirlineCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlinePayload>
          }
          createMany: {
            args: Prisma.AirlineCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AirlineCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlinePayload>[]
          }
          delete: {
            args: Prisma.AirlineDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlinePayload>
          }
          update: {
            args: Prisma.AirlineUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlinePayload>
          }
          deleteMany: {
            args: Prisma.AirlineDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AirlineUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AirlineUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlinePayload>[]
          }
          upsert: {
            args: Prisma.AirlineUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlinePayload>
          }
          aggregate: {
            args: Prisma.AirlineAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAirline>
          }
          groupBy: {
            args: Prisma.AirlineGroupByArgs<ExtArgs>
            result: $Utils.Optional<AirlineGroupByOutputType>[]
          }
          count: {
            args: Prisma.AirlineCountArgs<ExtArgs>
            result: $Utils.Optional<AirlineCountAggregateOutputType> | number
          }
        }
      }
      Flight: {
        payload: Prisma.$FlightPayload<ExtArgs>
        fields: Prisma.FlightFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FlightFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FlightFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload>
          }
          findFirst: {
            args: Prisma.FlightFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FlightFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload>
          }
          findMany: {
            args: Prisma.FlightFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload>[]
          }
          create: {
            args: Prisma.FlightCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload>
          }
          createMany: {
            args: Prisma.FlightCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FlightCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload>[]
          }
          delete: {
            args: Prisma.FlightDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload>
          }
          update: {
            args: Prisma.FlightUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload>
          }
          deleteMany: {
            args: Prisma.FlightDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FlightUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FlightUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload>[]
          }
          upsert: {
            args: Prisma.FlightUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload>
          }
          aggregate: {
            args: Prisma.FlightAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFlight>
          }
          groupBy: {
            args: Prisma.FlightGroupByArgs<ExtArgs>
            result: $Utils.Optional<FlightGroupByOutputType>[]
          }
          count: {
            args: Prisma.FlightCountArgs<ExtArgs>
            result: $Utils.Optional<FlightCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    airline?: AirlineOmit
    flight?: FlightOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AirlineCountOutputType
   */

  export type AirlineCountOutputType = {
    flights: number
  }

  export type AirlineCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    flights?: boolean | AirlineCountOutputTypeCountFlightsArgs
  }

  // Custom InputTypes
  /**
   * AirlineCountOutputType without action
   */
  export type AirlineCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirlineCountOutputType
     */
    select?: AirlineCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AirlineCountOutputType without action
   */
  export type AirlineCountOutputTypeCountFlightsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FlightWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Airline
   */

  export type AggregateAirline = {
    _count: AirlineCountAggregateOutputType | null
    _min: AirlineMinAggregateOutputType | null
    _max: AirlineMaxAggregateOutputType | null
  }

  export type AirlineMinAggregateOutputType = {
    id: string | null
    name: string | null
    country: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AirlineMaxAggregateOutputType = {
    id: string | null
    name: string | null
    country: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AirlineCountAggregateOutputType = {
    id: number
    name: number
    country: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AirlineMinAggregateInputType = {
    id?: true
    name?: true
    country?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AirlineMaxAggregateInputType = {
    id?: true
    name?: true
    country?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AirlineCountAggregateInputType = {
    id?: true
    name?: true
    country?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AirlineAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Airline to aggregate.
     */
    where?: AirlineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Airlines to fetch.
     */
    orderBy?: AirlineOrderByWithRelationInput | AirlineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AirlineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Airlines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Airlines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Airlines
    **/
    _count?: true | AirlineCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AirlineMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AirlineMaxAggregateInputType
  }

  export type GetAirlineAggregateType<T extends AirlineAggregateArgs> = {
        [P in keyof T & keyof AggregateAirline]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAirline[P]>
      : GetScalarType<T[P], AggregateAirline[P]>
  }




  export type AirlineGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AirlineWhereInput
    orderBy?: AirlineOrderByWithAggregationInput | AirlineOrderByWithAggregationInput[]
    by: AirlineScalarFieldEnum[] | AirlineScalarFieldEnum
    having?: AirlineScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AirlineCountAggregateInputType | true
    _min?: AirlineMinAggregateInputType
    _max?: AirlineMaxAggregateInputType
  }

  export type AirlineGroupByOutputType = {
    id: string
    name: string
    country: string
    createdAt: Date
    updatedAt: Date
    _count: AirlineCountAggregateOutputType | null
    _min: AirlineMinAggregateOutputType | null
    _max: AirlineMaxAggregateOutputType | null
  }

  type GetAirlineGroupByPayload<T extends AirlineGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AirlineGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AirlineGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AirlineGroupByOutputType[P]>
            : GetScalarType<T[P], AirlineGroupByOutputType[P]>
        }
      >
    >


  export type AirlineSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    country?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    flights?: boolean | Airline$flightsArgs<ExtArgs>
    _count?: boolean | AirlineCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["airline"]>

  export type AirlineSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    country?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["airline"]>

  export type AirlineSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    country?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["airline"]>

  export type AirlineSelectScalar = {
    id?: boolean
    name?: boolean
    country?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AirlineOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "country" | "createdAt" | "updatedAt", ExtArgs["result"]["airline"]>
  export type AirlineInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    flights?: boolean | Airline$flightsArgs<ExtArgs>
    _count?: boolean | AirlineCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AirlineIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AirlineIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AirlinePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Airline"
    objects: {
      flights: Prisma.$FlightPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      country: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["airline"]>
    composites: {}
  }

  type AirlineGetPayload<S extends boolean | null | undefined | AirlineDefaultArgs> = $Result.GetResult<Prisma.$AirlinePayload, S>

  type AirlineCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AirlineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AirlineCountAggregateInputType | true
    }

  export interface AirlineDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Airline'], meta: { name: 'Airline' } }
    /**
     * Find zero or one Airline that matches the filter.
     * @param {AirlineFindUniqueArgs} args - Arguments to find a Airline
     * @example
     * // Get one Airline
     * const airline = await prisma.airline.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AirlineFindUniqueArgs>(args: SelectSubset<T, AirlineFindUniqueArgs<ExtArgs>>): Prisma__AirlineClient<$Result.GetResult<Prisma.$AirlinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Airline that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AirlineFindUniqueOrThrowArgs} args - Arguments to find a Airline
     * @example
     * // Get one Airline
     * const airline = await prisma.airline.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AirlineFindUniqueOrThrowArgs>(args: SelectSubset<T, AirlineFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AirlineClient<$Result.GetResult<Prisma.$AirlinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Airline that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirlineFindFirstArgs} args - Arguments to find a Airline
     * @example
     * // Get one Airline
     * const airline = await prisma.airline.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AirlineFindFirstArgs>(args?: SelectSubset<T, AirlineFindFirstArgs<ExtArgs>>): Prisma__AirlineClient<$Result.GetResult<Prisma.$AirlinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Airline that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirlineFindFirstOrThrowArgs} args - Arguments to find a Airline
     * @example
     * // Get one Airline
     * const airline = await prisma.airline.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AirlineFindFirstOrThrowArgs>(args?: SelectSubset<T, AirlineFindFirstOrThrowArgs<ExtArgs>>): Prisma__AirlineClient<$Result.GetResult<Prisma.$AirlinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Airlines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirlineFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Airlines
     * const airlines = await prisma.airline.findMany()
     * 
     * // Get first 10 Airlines
     * const airlines = await prisma.airline.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const airlineWithIdOnly = await prisma.airline.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AirlineFindManyArgs>(args?: SelectSubset<T, AirlineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AirlinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Airline.
     * @param {AirlineCreateArgs} args - Arguments to create a Airline.
     * @example
     * // Create one Airline
     * const Airline = await prisma.airline.create({
     *   data: {
     *     // ... data to create a Airline
     *   }
     * })
     * 
     */
    create<T extends AirlineCreateArgs>(args: SelectSubset<T, AirlineCreateArgs<ExtArgs>>): Prisma__AirlineClient<$Result.GetResult<Prisma.$AirlinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Airlines.
     * @param {AirlineCreateManyArgs} args - Arguments to create many Airlines.
     * @example
     * // Create many Airlines
     * const airline = await prisma.airline.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AirlineCreateManyArgs>(args?: SelectSubset<T, AirlineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Airlines and returns the data saved in the database.
     * @param {AirlineCreateManyAndReturnArgs} args - Arguments to create many Airlines.
     * @example
     * // Create many Airlines
     * const airline = await prisma.airline.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Airlines and only return the `id`
     * const airlineWithIdOnly = await prisma.airline.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AirlineCreateManyAndReturnArgs>(args?: SelectSubset<T, AirlineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AirlinePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Airline.
     * @param {AirlineDeleteArgs} args - Arguments to delete one Airline.
     * @example
     * // Delete one Airline
     * const Airline = await prisma.airline.delete({
     *   where: {
     *     // ... filter to delete one Airline
     *   }
     * })
     * 
     */
    delete<T extends AirlineDeleteArgs>(args: SelectSubset<T, AirlineDeleteArgs<ExtArgs>>): Prisma__AirlineClient<$Result.GetResult<Prisma.$AirlinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Airline.
     * @param {AirlineUpdateArgs} args - Arguments to update one Airline.
     * @example
     * // Update one Airline
     * const airline = await prisma.airline.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AirlineUpdateArgs>(args: SelectSubset<T, AirlineUpdateArgs<ExtArgs>>): Prisma__AirlineClient<$Result.GetResult<Prisma.$AirlinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Airlines.
     * @param {AirlineDeleteManyArgs} args - Arguments to filter Airlines to delete.
     * @example
     * // Delete a few Airlines
     * const { count } = await prisma.airline.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AirlineDeleteManyArgs>(args?: SelectSubset<T, AirlineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Airlines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirlineUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Airlines
     * const airline = await prisma.airline.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AirlineUpdateManyArgs>(args: SelectSubset<T, AirlineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Airlines and returns the data updated in the database.
     * @param {AirlineUpdateManyAndReturnArgs} args - Arguments to update many Airlines.
     * @example
     * // Update many Airlines
     * const airline = await prisma.airline.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Airlines and only return the `id`
     * const airlineWithIdOnly = await prisma.airline.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AirlineUpdateManyAndReturnArgs>(args: SelectSubset<T, AirlineUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AirlinePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Airline.
     * @param {AirlineUpsertArgs} args - Arguments to update or create a Airline.
     * @example
     * // Update or create a Airline
     * const airline = await prisma.airline.upsert({
     *   create: {
     *     // ... data to create a Airline
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Airline we want to update
     *   }
     * })
     */
    upsert<T extends AirlineUpsertArgs>(args: SelectSubset<T, AirlineUpsertArgs<ExtArgs>>): Prisma__AirlineClient<$Result.GetResult<Prisma.$AirlinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Airlines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirlineCountArgs} args - Arguments to filter Airlines to count.
     * @example
     * // Count the number of Airlines
     * const count = await prisma.airline.count({
     *   where: {
     *     // ... the filter for the Airlines we want to count
     *   }
     * })
    **/
    count<T extends AirlineCountArgs>(
      args?: Subset<T, AirlineCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AirlineCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Airline.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirlineAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AirlineAggregateArgs>(args: Subset<T, AirlineAggregateArgs>): Prisma.PrismaPromise<GetAirlineAggregateType<T>>

    /**
     * Group by Airline.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirlineGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AirlineGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AirlineGroupByArgs['orderBy'] }
        : { orderBy?: AirlineGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AirlineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAirlineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Airline model
   */
  readonly fields: AirlineFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Airline.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AirlineClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    flights<T extends Airline$flightsArgs<ExtArgs> = {}>(args?: Subset<T, Airline$flightsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Airline model
   */
  interface AirlineFieldRefs {
    readonly id: FieldRef<"Airline", 'String'>
    readonly name: FieldRef<"Airline", 'String'>
    readonly country: FieldRef<"Airline", 'String'>
    readonly createdAt: FieldRef<"Airline", 'DateTime'>
    readonly updatedAt: FieldRef<"Airline", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Airline findUnique
   */
  export type AirlineFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airline
     */
    select?: AirlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airline
     */
    omit?: AirlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineInclude<ExtArgs> | null
    /**
     * Filter, which Airline to fetch.
     */
    where: AirlineWhereUniqueInput
  }

  /**
   * Airline findUniqueOrThrow
   */
  export type AirlineFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airline
     */
    select?: AirlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airline
     */
    omit?: AirlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineInclude<ExtArgs> | null
    /**
     * Filter, which Airline to fetch.
     */
    where: AirlineWhereUniqueInput
  }

  /**
   * Airline findFirst
   */
  export type AirlineFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airline
     */
    select?: AirlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airline
     */
    omit?: AirlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineInclude<ExtArgs> | null
    /**
     * Filter, which Airline to fetch.
     */
    where?: AirlineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Airlines to fetch.
     */
    orderBy?: AirlineOrderByWithRelationInput | AirlineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Airlines.
     */
    cursor?: AirlineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Airlines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Airlines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Airlines.
     */
    distinct?: AirlineScalarFieldEnum | AirlineScalarFieldEnum[]
  }

  /**
   * Airline findFirstOrThrow
   */
  export type AirlineFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airline
     */
    select?: AirlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airline
     */
    omit?: AirlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineInclude<ExtArgs> | null
    /**
     * Filter, which Airline to fetch.
     */
    where?: AirlineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Airlines to fetch.
     */
    orderBy?: AirlineOrderByWithRelationInput | AirlineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Airlines.
     */
    cursor?: AirlineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Airlines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Airlines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Airlines.
     */
    distinct?: AirlineScalarFieldEnum | AirlineScalarFieldEnum[]
  }

  /**
   * Airline findMany
   */
  export type AirlineFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airline
     */
    select?: AirlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airline
     */
    omit?: AirlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineInclude<ExtArgs> | null
    /**
     * Filter, which Airlines to fetch.
     */
    where?: AirlineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Airlines to fetch.
     */
    orderBy?: AirlineOrderByWithRelationInput | AirlineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Airlines.
     */
    cursor?: AirlineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Airlines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Airlines.
     */
    skip?: number
    distinct?: AirlineScalarFieldEnum | AirlineScalarFieldEnum[]
  }

  /**
   * Airline create
   */
  export type AirlineCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airline
     */
    select?: AirlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airline
     */
    omit?: AirlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineInclude<ExtArgs> | null
    /**
     * The data needed to create a Airline.
     */
    data: XOR<AirlineCreateInput, AirlineUncheckedCreateInput>
  }

  /**
   * Airline createMany
   */
  export type AirlineCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Airlines.
     */
    data: AirlineCreateManyInput | AirlineCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Airline createManyAndReturn
   */
  export type AirlineCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airline
     */
    select?: AirlineSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Airline
     */
    omit?: AirlineOmit<ExtArgs> | null
    /**
     * The data used to create many Airlines.
     */
    data: AirlineCreateManyInput | AirlineCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Airline update
   */
  export type AirlineUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airline
     */
    select?: AirlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airline
     */
    omit?: AirlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineInclude<ExtArgs> | null
    /**
     * The data needed to update a Airline.
     */
    data: XOR<AirlineUpdateInput, AirlineUncheckedUpdateInput>
    /**
     * Choose, which Airline to update.
     */
    where: AirlineWhereUniqueInput
  }

  /**
   * Airline updateMany
   */
  export type AirlineUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Airlines.
     */
    data: XOR<AirlineUpdateManyMutationInput, AirlineUncheckedUpdateManyInput>
    /**
     * Filter which Airlines to update
     */
    where?: AirlineWhereInput
    /**
     * Limit how many Airlines to update.
     */
    limit?: number
  }

  /**
   * Airline updateManyAndReturn
   */
  export type AirlineUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airline
     */
    select?: AirlineSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Airline
     */
    omit?: AirlineOmit<ExtArgs> | null
    /**
     * The data used to update Airlines.
     */
    data: XOR<AirlineUpdateManyMutationInput, AirlineUncheckedUpdateManyInput>
    /**
     * Filter which Airlines to update
     */
    where?: AirlineWhereInput
    /**
     * Limit how many Airlines to update.
     */
    limit?: number
  }

  /**
   * Airline upsert
   */
  export type AirlineUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airline
     */
    select?: AirlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airline
     */
    omit?: AirlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineInclude<ExtArgs> | null
    /**
     * The filter to search for the Airline to update in case it exists.
     */
    where: AirlineWhereUniqueInput
    /**
     * In case the Airline found by the `where` argument doesn't exist, create a new Airline with this data.
     */
    create: XOR<AirlineCreateInput, AirlineUncheckedCreateInput>
    /**
     * In case the Airline was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AirlineUpdateInput, AirlineUncheckedUpdateInput>
  }

  /**
   * Airline delete
   */
  export type AirlineDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airline
     */
    select?: AirlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airline
     */
    omit?: AirlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineInclude<ExtArgs> | null
    /**
     * Filter which Airline to delete.
     */
    where: AirlineWhereUniqueInput
  }

  /**
   * Airline deleteMany
   */
  export type AirlineDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Airlines to delete
     */
    where?: AirlineWhereInput
    /**
     * Limit how many Airlines to delete.
     */
    limit?: number
  }

  /**
   * Airline.flights
   */
  export type Airline$flightsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    where?: FlightWhereInput
    orderBy?: FlightOrderByWithRelationInput | FlightOrderByWithRelationInput[]
    cursor?: FlightWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FlightScalarFieldEnum | FlightScalarFieldEnum[]
  }

  /**
   * Airline without action
   */
  export type AirlineDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airline
     */
    select?: AirlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airline
     */
    omit?: AirlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineInclude<ExtArgs> | null
  }


  /**
   * Model Flight
   */

  export type AggregateFlight = {
    _count: FlightCountAggregateOutputType | null
    _avg: FlightAvgAggregateOutputType | null
    _sum: FlightSumAggregateOutputType | null
    _min: FlightMinAggregateOutputType | null
    _max: FlightMaxAggregateOutputType | null
  }

  export type FlightAvgAggregateOutputType = {
    flightNumber: number | null
    duration: number | null
  }

  export type FlightSumAggregateOutputType = {
    flightNumber: number | null
    duration: number | null
  }

  export type FlightMinAggregateOutputType = {
    id: string | null
    flightNumber: number | null
    expectedDeparture: Date | null
    expectedArrival: Date | null
    duration: number | null
    terminal: string | null
    gate: string | null
    airlineId: string | null
    status: $Enums.FlightStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FlightMaxAggregateOutputType = {
    id: string | null
    flightNumber: number | null
    expectedDeparture: Date | null
    expectedArrival: Date | null
    duration: number | null
    terminal: string | null
    gate: string | null
    airlineId: string | null
    status: $Enums.FlightStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FlightCountAggregateOutputType = {
    id: number
    flightNumber: number
    expectedDeparture: number
    expectedArrival: number
    duration: number
    terminal: number
    gate: number
    airlineId: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FlightAvgAggregateInputType = {
    flightNumber?: true
    duration?: true
  }

  export type FlightSumAggregateInputType = {
    flightNumber?: true
    duration?: true
  }

  export type FlightMinAggregateInputType = {
    id?: true
    flightNumber?: true
    expectedDeparture?: true
    expectedArrival?: true
    duration?: true
    terminal?: true
    gate?: true
    airlineId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FlightMaxAggregateInputType = {
    id?: true
    flightNumber?: true
    expectedDeparture?: true
    expectedArrival?: true
    duration?: true
    terminal?: true
    gate?: true
    airlineId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FlightCountAggregateInputType = {
    id?: true
    flightNumber?: true
    expectedDeparture?: true
    expectedArrival?: true
    duration?: true
    terminal?: true
    gate?: true
    airlineId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FlightAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Flight to aggregate.
     */
    where?: FlightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Flights to fetch.
     */
    orderBy?: FlightOrderByWithRelationInput | FlightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FlightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Flights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Flights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Flights
    **/
    _count?: true | FlightCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FlightAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FlightSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FlightMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FlightMaxAggregateInputType
  }

  export type GetFlightAggregateType<T extends FlightAggregateArgs> = {
        [P in keyof T & keyof AggregateFlight]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFlight[P]>
      : GetScalarType<T[P], AggregateFlight[P]>
  }




  export type FlightGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FlightWhereInput
    orderBy?: FlightOrderByWithAggregationInput | FlightOrderByWithAggregationInput[]
    by: FlightScalarFieldEnum[] | FlightScalarFieldEnum
    having?: FlightScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FlightCountAggregateInputType | true
    _avg?: FlightAvgAggregateInputType
    _sum?: FlightSumAggregateInputType
    _min?: FlightMinAggregateInputType
    _max?: FlightMaxAggregateInputType
  }

  export type FlightGroupByOutputType = {
    id: string
    flightNumber: number
    expectedDeparture: Date
    expectedArrival: Date
    duration: number
    terminal: string
    gate: string
    airlineId: string
    status: $Enums.FlightStatus
    createdAt: Date
    updatedAt: Date
    _count: FlightCountAggregateOutputType | null
    _avg: FlightAvgAggregateOutputType | null
    _sum: FlightSumAggregateOutputType | null
    _min: FlightMinAggregateOutputType | null
    _max: FlightMaxAggregateOutputType | null
  }

  type GetFlightGroupByPayload<T extends FlightGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FlightGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FlightGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FlightGroupByOutputType[P]>
            : GetScalarType<T[P], FlightGroupByOutputType[P]>
        }
      >
    >


  export type FlightSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    flightNumber?: boolean
    expectedDeparture?: boolean
    expectedArrival?: boolean
    duration?: boolean
    terminal?: boolean
    gate?: boolean
    airlineId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    airline?: boolean | AirlineDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["flight"]>

  export type FlightSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    flightNumber?: boolean
    expectedDeparture?: boolean
    expectedArrival?: boolean
    duration?: boolean
    terminal?: boolean
    gate?: boolean
    airlineId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    airline?: boolean | AirlineDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["flight"]>

  export type FlightSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    flightNumber?: boolean
    expectedDeparture?: boolean
    expectedArrival?: boolean
    duration?: boolean
    terminal?: boolean
    gate?: boolean
    airlineId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    airline?: boolean | AirlineDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["flight"]>

  export type FlightSelectScalar = {
    id?: boolean
    flightNumber?: boolean
    expectedDeparture?: boolean
    expectedArrival?: boolean
    duration?: boolean
    terminal?: boolean
    gate?: boolean
    airlineId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FlightOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "flightNumber" | "expectedDeparture" | "expectedArrival" | "duration" | "terminal" | "gate" | "airlineId" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["flight"]>
  export type FlightInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    airline?: boolean | AirlineDefaultArgs<ExtArgs>
  }
  export type FlightIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    airline?: boolean | AirlineDefaultArgs<ExtArgs>
  }
  export type FlightIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    airline?: boolean | AirlineDefaultArgs<ExtArgs>
  }

  export type $FlightPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Flight"
    objects: {
      airline: Prisma.$AirlinePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      flightNumber: number
      expectedDeparture: Date
      expectedArrival: Date
      duration: number
      terminal: string
      gate: string
      airlineId: string
      status: $Enums.FlightStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["flight"]>
    composites: {}
  }

  type FlightGetPayload<S extends boolean | null | undefined | FlightDefaultArgs> = $Result.GetResult<Prisma.$FlightPayload, S>

  type FlightCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FlightFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FlightCountAggregateInputType | true
    }

  export interface FlightDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Flight'], meta: { name: 'Flight' } }
    /**
     * Find zero or one Flight that matches the filter.
     * @param {FlightFindUniqueArgs} args - Arguments to find a Flight
     * @example
     * // Get one Flight
     * const flight = await prisma.flight.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FlightFindUniqueArgs>(args: SelectSubset<T, FlightFindUniqueArgs<ExtArgs>>): Prisma__FlightClient<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Flight that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FlightFindUniqueOrThrowArgs} args - Arguments to find a Flight
     * @example
     * // Get one Flight
     * const flight = await prisma.flight.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FlightFindUniqueOrThrowArgs>(args: SelectSubset<T, FlightFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FlightClient<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Flight that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlightFindFirstArgs} args - Arguments to find a Flight
     * @example
     * // Get one Flight
     * const flight = await prisma.flight.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FlightFindFirstArgs>(args?: SelectSubset<T, FlightFindFirstArgs<ExtArgs>>): Prisma__FlightClient<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Flight that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlightFindFirstOrThrowArgs} args - Arguments to find a Flight
     * @example
     * // Get one Flight
     * const flight = await prisma.flight.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FlightFindFirstOrThrowArgs>(args?: SelectSubset<T, FlightFindFirstOrThrowArgs<ExtArgs>>): Prisma__FlightClient<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Flights that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlightFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Flights
     * const flights = await prisma.flight.findMany()
     * 
     * // Get first 10 Flights
     * const flights = await prisma.flight.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const flightWithIdOnly = await prisma.flight.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FlightFindManyArgs>(args?: SelectSubset<T, FlightFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Flight.
     * @param {FlightCreateArgs} args - Arguments to create a Flight.
     * @example
     * // Create one Flight
     * const Flight = await prisma.flight.create({
     *   data: {
     *     // ... data to create a Flight
     *   }
     * })
     * 
     */
    create<T extends FlightCreateArgs>(args: SelectSubset<T, FlightCreateArgs<ExtArgs>>): Prisma__FlightClient<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Flights.
     * @param {FlightCreateManyArgs} args - Arguments to create many Flights.
     * @example
     * // Create many Flights
     * const flight = await prisma.flight.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FlightCreateManyArgs>(args?: SelectSubset<T, FlightCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Flights and returns the data saved in the database.
     * @param {FlightCreateManyAndReturnArgs} args - Arguments to create many Flights.
     * @example
     * // Create many Flights
     * const flight = await prisma.flight.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Flights and only return the `id`
     * const flightWithIdOnly = await prisma.flight.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FlightCreateManyAndReturnArgs>(args?: SelectSubset<T, FlightCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Flight.
     * @param {FlightDeleteArgs} args - Arguments to delete one Flight.
     * @example
     * // Delete one Flight
     * const Flight = await prisma.flight.delete({
     *   where: {
     *     // ... filter to delete one Flight
     *   }
     * })
     * 
     */
    delete<T extends FlightDeleteArgs>(args: SelectSubset<T, FlightDeleteArgs<ExtArgs>>): Prisma__FlightClient<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Flight.
     * @param {FlightUpdateArgs} args - Arguments to update one Flight.
     * @example
     * // Update one Flight
     * const flight = await prisma.flight.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FlightUpdateArgs>(args: SelectSubset<T, FlightUpdateArgs<ExtArgs>>): Prisma__FlightClient<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Flights.
     * @param {FlightDeleteManyArgs} args - Arguments to filter Flights to delete.
     * @example
     * // Delete a few Flights
     * const { count } = await prisma.flight.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FlightDeleteManyArgs>(args?: SelectSubset<T, FlightDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Flights.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlightUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Flights
     * const flight = await prisma.flight.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FlightUpdateManyArgs>(args: SelectSubset<T, FlightUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Flights and returns the data updated in the database.
     * @param {FlightUpdateManyAndReturnArgs} args - Arguments to update many Flights.
     * @example
     * // Update many Flights
     * const flight = await prisma.flight.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Flights and only return the `id`
     * const flightWithIdOnly = await prisma.flight.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FlightUpdateManyAndReturnArgs>(args: SelectSubset<T, FlightUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Flight.
     * @param {FlightUpsertArgs} args - Arguments to update or create a Flight.
     * @example
     * // Update or create a Flight
     * const flight = await prisma.flight.upsert({
     *   create: {
     *     // ... data to create a Flight
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Flight we want to update
     *   }
     * })
     */
    upsert<T extends FlightUpsertArgs>(args: SelectSubset<T, FlightUpsertArgs<ExtArgs>>): Prisma__FlightClient<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Flights.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlightCountArgs} args - Arguments to filter Flights to count.
     * @example
     * // Count the number of Flights
     * const count = await prisma.flight.count({
     *   where: {
     *     // ... the filter for the Flights we want to count
     *   }
     * })
    **/
    count<T extends FlightCountArgs>(
      args?: Subset<T, FlightCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FlightCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Flight.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlightAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FlightAggregateArgs>(args: Subset<T, FlightAggregateArgs>): Prisma.PrismaPromise<GetFlightAggregateType<T>>

    /**
     * Group by Flight.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlightGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FlightGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FlightGroupByArgs['orderBy'] }
        : { orderBy?: FlightGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FlightGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFlightGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Flight model
   */
  readonly fields: FlightFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Flight.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FlightClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    airline<T extends AirlineDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AirlineDefaultArgs<ExtArgs>>): Prisma__AirlineClient<$Result.GetResult<Prisma.$AirlinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Flight model
   */
  interface FlightFieldRefs {
    readonly id: FieldRef<"Flight", 'String'>
    readonly flightNumber: FieldRef<"Flight", 'Int'>
    readonly expectedDeparture: FieldRef<"Flight", 'DateTime'>
    readonly expectedArrival: FieldRef<"Flight", 'DateTime'>
    readonly duration: FieldRef<"Flight", 'Int'>
    readonly terminal: FieldRef<"Flight", 'String'>
    readonly gate: FieldRef<"Flight", 'String'>
    readonly airlineId: FieldRef<"Flight", 'String'>
    readonly status: FieldRef<"Flight", 'FlightStatus'>
    readonly createdAt: FieldRef<"Flight", 'DateTime'>
    readonly updatedAt: FieldRef<"Flight", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Flight findUnique
   */
  export type FlightFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    /**
     * Filter, which Flight to fetch.
     */
    where: FlightWhereUniqueInput
  }

  /**
   * Flight findUniqueOrThrow
   */
  export type FlightFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    /**
     * Filter, which Flight to fetch.
     */
    where: FlightWhereUniqueInput
  }

  /**
   * Flight findFirst
   */
  export type FlightFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    /**
     * Filter, which Flight to fetch.
     */
    where?: FlightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Flights to fetch.
     */
    orderBy?: FlightOrderByWithRelationInput | FlightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Flights.
     */
    cursor?: FlightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Flights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Flights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Flights.
     */
    distinct?: FlightScalarFieldEnum | FlightScalarFieldEnum[]
  }

  /**
   * Flight findFirstOrThrow
   */
  export type FlightFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    /**
     * Filter, which Flight to fetch.
     */
    where?: FlightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Flights to fetch.
     */
    orderBy?: FlightOrderByWithRelationInput | FlightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Flights.
     */
    cursor?: FlightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Flights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Flights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Flights.
     */
    distinct?: FlightScalarFieldEnum | FlightScalarFieldEnum[]
  }

  /**
   * Flight findMany
   */
  export type FlightFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    /**
     * Filter, which Flights to fetch.
     */
    where?: FlightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Flights to fetch.
     */
    orderBy?: FlightOrderByWithRelationInput | FlightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Flights.
     */
    cursor?: FlightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Flights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Flights.
     */
    skip?: number
    distinct?: FlightScalarFieldEnum | FlightScalarFieldEnum[]
  }

  /**
   * Flight create
   */
  export type FlightCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    /**
     * The data needed to create a Flight.
     */
    data: XOR<FlightCreateInput, FlightUncheckedCreateInput>
  }

  /**
   * Flight createMany
   */
  export type FlightCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Flights.
     */
    data: FlightCreateManyInput | FlightCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Flight createManyAndReturn
   */
  export type FlightCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * The data used to create many Flights.
     */
    data: FlightCreateManyInput | FlightCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Flight update
   */
  export type FlightUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    /**
     * The data needed to update a Flight.
     */
    data: XOR<FlightUpdateInput, FlightUncheckedUpdateInput>
    /**
     * Choose, which Flight to update.
     */
    where: FlightWhereUniqueInput
  }

  /**
   * Flight updateMany
   */
  export type FlightUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Flights.
     */
    data: XOR<FlightUpdateManyMutationInput, FlightUncheckedUpdateManyInput>
    /**
     * Filter which Flights to update
     */
    where?: FlightWhereInput
    /**
     * Limit how many Flights to update.
     */
    limit?: number
  }

  /**
   * Flight updateManyAndReturn
   */
  export type FlightUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * The data used to update Flights.
     */
    data: XOR<FlightUpdateManyMutationInput, FlightUncheckedUpdateManyInput>
    /**
     * Filter which Flights to update
     */
    where?: FlightWhereInput
    /**
     * Limit how many Flights to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Flight upsert
   */
  export type FlightUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    /**
     * The filter to search for the Flight to update in case it exists.
     */
    where: FlightWhereUniqueInput
    /**
     * In case the Flight found by the `where` argument doesn't exist, create a new Flight with this data.
     */
    create: XOR<FlightCreateInput, FlightUncheckedCreateInput>
    /**
     * In case the Flight was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FlightUpdateInput, FlightUncheckedUpdateInput>
  }

  /**
   * Flight delete
   */
  export type FlightDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    /**
     * Filter which Flight to delete.
     */
    where: FlightWhereUniqueInput
  }

  /**
   * Flight deleteMany
   */
  export type FlightDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Flights to delete
     */
    where?: FlightWhereInput
    /**
     * Limit how many Flights to delete.
     */
    limit?: number
  }

  /**
   * Flight without action
   */
  export type FlightDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AirlineScalarFieldEnum: {
    id: 'id',
    name: 'name',
    country: 'country',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AirlineScalarFieldEnum = (typeof AirlineScalarFieldEnum)[keyof typeof AirlineScalarFieldEnum]


  export const FlightScalarFieldEnum: {
    id: 'id',
    flightNumber: 'flightNumber',
    expectedDeparture: 'expectedDeparture',
    expectedArrival: 'expectedArrival',
    duration: 'duration',
    terminal: 'terminal',
    gate: 'gate',
    airlineId: 'airlineId',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FlightScalarFieldEnum = (typeof FlightScalarFieldEnum)[keyof typeof FlightScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'FlightStatus'
   */
  export type EnumFlightStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FlightStatus'>
    


  /**
   * Reference to a field of type 'FlightStatus[]'
   */
  export type ListEnumFlightStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FlightStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type AirlineWhereInput = {
    AND?: AirlineWhereInput | AirlineWhereInput[]
    OR?: AirlineWhereInput[]
    NOT?: AirlineWhereInput | AirlineWhereInput[]
    id?: StringFilter<"Airline"> | string
    name?: StringFilter<"Airline"> | string
    country?: StringFilter<"Airline"> | string
    createdAt?: DateTimeFilter<"Airline"> | Date | string
    updatedAt?: DateTimeFilter<"Airline"> | Date | string
    flights?: FlightListRelationFilter
  }

  export type AirlineOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    country?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    flights?: FlightOrderByRelationAggregateInput
  }

  export type AirlineWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: AirlineWhereInput | AirlineWhereInput[]
    OR?: AirlineWhereInput[]
    NOT?: AirlineWhereInput | AirlineWhereInput[]
    country?: StringFilter<"Airline"> | string
    createdAt?: DateTimeFilter<"Airline"> | Date | string
    updatedAt?: DateTimeFilter<"Airline"> | Date | string
    flights?: FlightListRelationFilter
  }, "id" | "name">

  export type AirlineOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    country?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AirlineCountOrderByAggregateInput
    _max?: AirlineMaxOrderByAggregateInput
    _min?: AirlineMinOrderByAggregateInput
  }

  export type AirlineScalarWhereWithAggregatesInput = {
    AND?: AirlineScalarWhereWithAggregatesInput | AirlineScalarWhereWithAggregatesInput[]
    OR?: AirlineScalarWhereWithAggregatesInput[]
    NOT?: AirlineScalarWhereWithAggregatesInput | AirlineScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Airline"> | string
    name?: StringWithAggregatesFilter<"Airline"> | string
    country?: StringWithAggregatesFilter<"Airline"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Airline"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Airline"> | Date | string
  }

  export type FlightWhereInput = {
    AND?: FlightWhereInput | FlightWhereInput[]
    OR?: FlightWhereInput[]
    NOT?: FlightWhereInput | FlightWhereInput[]
    id?: StringFilter<"Flight"> | string
    flightNumber?: IntFilter<"Flight"> | number
    expectedDeparture?: DateTimeFilter<"Flight"> | Date | string
    expectedArrival?: DateTimeFilter<"Flight"> | Date | string
    duration?: IntFilter<"Flight"> | number
    terminal?: StringFilter<"Flight"> | string
    gate?: StringFilter<"Flight"> | string
    airlineId?: StringFilter<"Flight"> | string
    status?: EnumFlightStatusFilter<"Flight"> | $Enums.FlightStatus
    createdAt?: DateTimeFilter<"Flight"> | Date | string
    updatedAt?: DateTimeFilter<"Flight"> | Date | string
    airline?: XOR<AirlineScalarRelationFilter, AirlineWhereInput>
  }

  export type FlightOrderByWithRelationInput = {
    id?: SortOrder
    flightNumber?: SortOrder
    expectedDeparture?: SortOrder
    expectedArrival?: SortOrder
    duration?: SortOrder
    terminal?: SortOrder
    gate?: SortOrder
    airlineId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    airline?: AirlineOrderByWithRelationInput
  }

  export type FlightWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FlightWhereInput | FlightWhereInput[]
    OR?: FlightWhereInput[]
    NOT?: FlightWhereInput | FlightWhereInput[]
    flightNumber?: IntFilter<"Flight"> | number
    expectedDeparture?: DateTimeFilter<"Flight"> | Date | string
    expectedArrival?: DateTimeFilter<"Flight"> | Date | string
    duration?: IntFilter<"Flight"> | number
    terminal?: StringFilter<"Flight"> | string
    gate?: StringFilter<"Flight"> | string
    airlineId?: StringFilter<"Flight"> | string
    status?: EnumFlightStatusFilter<"Flight"> | $Enums.FlightStatus
    createdAt?: DateTimeFilter<"Flight"> | Date | string
    updatedAt?: DateTimeFilter<"Flight"> | Date | string
    airline?: XOR<AirlineScalarRelationFilter, AirlineWhereInput>
  }, "id">

  export type FlightOrderByWithAggregationInput = {
    id?: SortOrder
    flightNumber?: SortOrder
    expectedDeparture?: SortOrder
    expectedArrival?: SortOrder
    duration?: SortOrder
    terminal?: SortOrder
    gate?: SortOrder
    airlineId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FlightCountOrderByAggregateInput
    _avg?: FlightAvgOrderByAggregateInput
    _max?: FlightMaxOrderByAggregateInput
    _min?: FlightMinOrderByAggregateInput
    _sum?: FlightSumOrderByAggregateInput
  }

  export type FlightScalarWhereWithAggregatesInput = {
    AND?: FlightScalarWhereWithAggregatesInput | FlightScalarWhereWithAggregatesInput[]
    OR?: FlightScalarWhereWithAggregatesInput[]
    NOT?: FlightScalarWhereWithAggregatesInput | FlightScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Flight"> | string
    flightNumber?: IntWithAggregatesFilter<"Flight"> | number
    expectedDeparture?: DateTimeWithAggregatesFilter<"Flight"> | Date | string
    expectedArrival?: DateTimeWithAggregatesFilter<"Flight"> | Date | string
    duration?: IntWithAggregatesFilter<"Flight"> | number
    terminal?: StringWithAggregatesFilter<"Flight"> | string
    gate?: StringWithAggregatesFilter<"Flight"> | string
    airlineId?: StringWithAggregatesFilter<"Flight"> | string
    status?: EnumFlightStatusWithAggregatesFilter<"Flight"> | $Enums.FlightStatus
    createdAt?: DateTimeWithAggregatesFilter<"Flight"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Flight"> | Date | string
  }

  export type AirlineCreateInput = {
    id?: string
    name: string
    country: string
    createdAt?: Date | string
    updatedAt?: Date | string
    flights?: FlightCreateNestedManyWithoutAirlineInput
  }

  export type AirlineUncheckedCreateInput = {
    id?: string
    name: string
    country: string
    createdAt?: Date | string
    updatedAt?: Date | string
    flights?: FlightUncheckedCreateNestedManyWithoutAirlineInput
  }

  export type AirlineUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flights?: FlightUpdateManyWithoutAirlineNestedInput
  }

  export type AirlineUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flights?: FlightUncheckedUpdateManyWithoutAirlineNestedInput
  }

  export type AirlineCreateManyInput = {
    id?: string
    name: string
    country: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AirlineUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AirlineUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FlightCreateInput = {
    id?: string
    flightNumber?: number
    expectedDeparture: Date | string
    expectedArrival: Date | string
    duration: number
    terminal: string
    gate: string
    status?: $Enums.FlightStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    airline: AirlineCreateNestedOneWithoutFlightsInput
  }

  export type FlightUncheckedCreateInput = {
    id?: string
    flightNumber?: number
    expectedDeparture: Date | string
    expectedArrival: Date | string
    duration: number
    terminal: string
    gate: string
    airlineId: string
    status?: $Enums.FlightStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FlightUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    flightNumber?: IntFieldUpdateOperationsInput | number
    expectedDeparture?: DateTimeFieldUpdateOperationsInput | Date | string
    expectedArrival?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    terminal?: StringFieldUpdateOperationsInput | string
    gate?: StringFieldUpdateOperationsInput | string
    status?: EnumFlightStatusFieldUpdateOperationsInput | $Enums.FlightStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    airline?: AirlineUpdateOneRequiredWithoutFlightsNestedInput
  }

  export type FlightUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    flightNumber?: IntFieldUpdateOperationsInput | number
    expectedDeparture?: DateTimeFieldUpdateOperationsInput | Date | string
    expectedArrival?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    terminal?: StringFieldUpdateOperationsInput | string
    gate?: StringFieldUpdateOperationsInput | string
    airlineId?: StringFieldUpdateOperationsInput | string
    status?: EnumFlightStatusFieldUpdateOperationsInput | $Enums.FlightStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FlightCreateManyInput = {
    id?: string
    flightNumber?: number
    expectedDeparture: Date | string
    expectedArrival: Date | string
    duration: number
    terminal: string
    gate: string
    airlineId: string
    status?: $Enums.FlightStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FlightUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    flightNumber?: IntFieldUpdateOperationsInput | number
    expectedDeparture?: DateTimeFieldUpdateOperationsInput | Date | string
    expectedArrival?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    terminal?: StringFieldUpdateOperationsInput | string
    gate?: StringFieldUpdateOperationsInput | string
    status?: EnumFlightStatusFieldUpdateOperationsInput | $Enums.FlightStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FlightUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    flightNumber?: IntFieldUpdateOperationsInput | number
    expectedDeparture?: DateTimeFieldUpdateOperationsInput | Date | string
    expectedArrival?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    terminal?: StringFieldUpdateOperationsInput | string
    gate?: StringFieldUpdateOperationsInput | string
    airlineId?: StringFieldUpdateOperationsInput | string
    status?: EnumFlightStatusFieldUpdateOperationsInput | $Enums.FlightStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type FlightListRelationFilter = {
    every?: FlightWhereInput
    some?: FlightWhereInput
    none?: FlightWhereInput
  }

  export type FlightOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AirlineCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    country?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AirlineMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    country?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AirlineMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    country?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumFlightStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FlightStatus | EnumFlightStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FlightStatus[] | ListEnumFlightStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FlightStatus[] | ListEnumFlightStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFlightStatusFilter<$PrismaModel> | $Enums.FlightStatus
  }

  export type AirlineScalarRelationFilter = {
    is?: AirlineWhereInput
    isNot?: AirlineWhereInput
  }

  export type FlightCountOrderByAggregateInput = {
    id?: SortOrder
    flightNumber?: SortOrder
    expectedDeparture?: SortOrder
    expectedArrival?: SortOrder
    duration?: SortOrder
    terminal?: SortOrder
    gate?: SortOrder
    airlineId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FlightAvgOrderByAggregateInput = {
    flightNumber?: SortOrder
    duration?: SortOrder
  }

  export type FlightMaxOrderByAggregateInput = {
    id?: SortOrder
    flightNumber?: SortOrder
    expectedDeparture?: SortOrder
    expectedArrival?: SortOrder
    duration?: SortOrder
    terminal?: SortOrder
    gate?: SortOrder
    airlineId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FlightMinOrderByAggregateInput = {
    id?: SortOrder
    flightNumber?: SortOrder
    expectedDeparture?: SortOrder
    expectedArrival?: SortOrder
    duration?: SortOrder
    terminal?: SortOrder
    gate?: SortOrder
    airlineId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FlightSumOrderByAggregateInput = {
    flightNumber?: SortOrder
    duration?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumFlightStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FlightStatus | EnumFlightStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FlightStatus[] | ListEnumFlightStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FlightStatus[] | ListEnumFlightStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFlightStatusWithAggregatesFilter<$PrismaModel> | $Enums.FlightStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFlightStatusFilter<$PrismaModel>
    _max?: NestedEnumFlightStatusFilter<$PrismaModel>
  }

  export type FlightCreateNestedManyWithoutAirlineInput = {
    create?: XOR<FlightCreateWithoutAirlineInput, FlightUncheckedCreateWithoutAirlineInput> | FlightCreateWithoutAirlineInput[] | FlightUncheckedCreateWithoutAirlineInput[]
    connectOrCreate?: FlightCreateOrConnectWithoutAirlineInput | FlightCreateOrConnectWithoutAirlineInput[]
    createMany?: FlightCreateManyAirlineInputEnvelope
    connect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
  }

  export type FlightUncheckedCreateNestedManyWithoutAirlineInput = {
    create?: XOR<FlightCreateWithoutAirlineInput, FlightUncheckedCreateWithoutAirlineInput> | FlightCreateWithoutAirlineInput[] | FlightUncheckedCreateWithoutAirlineInput[]
    connectOrCreate?: FlightCreateOrConnectWithoutAirlineInput | FlightCreateOrConnectWithoutAirlineInput[]
    createMany?: FlightCreateManyAirlineInputEnvelope
    connect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type FlightUpdateManyWithoutAirlineNestedInput = {
    create?: XOR<FlightCreateWithoutAirlineInput, FlightUncheckedCreateWithoutAirlineInput> | FlightCreateWithoutAirlineInput[] | FlightUncheckedCreateWithoutAirlineInput[]
    connectOrCreate?: FlightCreateOrConnectWithoutAirlineInput | FlightCreateOrConnectWithoutAirlineInput[]
    upsert?: FlightUpsertWithWhereUniqueWithoutAirlineInput | FlightUpsertWithWhereUniqueWithoutAirlineInput[]
    createMany?: FlightCreateManyAirlineInputEnvelope
    set?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    disconnect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    delete?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    connect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    update?: FlightUpdateWithWhereUniqueWithoutAirlineInput | FlightUpdateWithWhereUniqueWithoutAirlineInput[]
    updateMany?: FlightUpdateManyWithWhereWithoutAirlineInput | FlightUpdateManyWithWhereWithoutAirlineInput[]
    deleteMany?: FlightScalarWhereInput | FlightScalarWhereInput[]
  }

  export type FlightUncheckedUpdateManyWithoutAirlineNestedInput = {
    create?: XOR<FlightCreateWithoutAirlineInput, FlightUncheckedCreateWithoutAirlineInput> | FlightCreateWithoutAirlineInput[] | FlightUncheckedCreateWithoutAirlineInput[]
    connectOrCreate?: FlightCreateOrConnectWithoutAirlineInput | FlightCreateOrConnectWithoutAirlineInput[]
    upsert?: FlightUpsertWithWhereUniqueWithoutAirlineInput | FlightUpsertWithWhereUniqueWithoutAirlineInput[]
    createMany?: FlightCreateManyAirlineInputEnvelope
    set?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    disconnect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    delete?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    connect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    update?: FlightUpdateWithWhereUniqueWithoutAirlineInput | FlightUpdateWithWhereUniqueWithoutAirlineInput[]
    updateMany?: FlightUpdateManyWithWhereWithoutAirlineInput | FlightUpdateManyWithWhereWithoutAirlineInput[]
    deleteMany?: FlightScalarWhereInput | FlightScalarWhereInput[]
  }

  export type AirlineCreateNestedOneWithoutFlightsInput = {
    create?: XOR<AirlineCreateWithoutFlightsInput, AirlineUncheckedCreateWithoutFlightsInput>
    connectOrCreate?: AirlineCreateOrConnectWithoutFlightsInput
    connect?: AirlineWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumFlightStatusFieldUpdateOperationsInput = {
    set?: $Enums.FlightStatus
  }

  export type AirlineUpdateOneRequiredWithoutFlightsNestedInput = {
    create?: XOR<AirlineCreateWithoutFlightsInput, AirlineUncheckedCreateWithoutFlightsInput>
    connectOrCreate?: AirlineCreateOrConnectWithoutFlightsInput
    upsert?: AirlineUpsertWithoutFlightsInput
    connect?: AirlineWhereUniqueInput
    update?: XOR<XOR<AirlineUpdateToOneWithWhereWithoutFlightsInput, AirlineUpdateWithoutFlightsInput>, AirlineUncheckedUpdateWithoutFlightsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumFlightStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FlightStatus | EnumFlightStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FlightStatus[] | ListEnumFlightStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FlightStatus[] | ListEnumFlightStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFlightStatusFilter<$PrismaModel> | $Enums.FlightStatus
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumFlightStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FlightStatus | EnumFlightStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FlightStatus[] | ListEnumFlightStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FlightStatus[] | ListEnumFlightStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFlightStatusWithAggregatesFilter<$PrismaModel> | $Enums.FlightStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFlightStatusFilter<$PrismaModel>
    _max?: NestedEnumFlightStatusFilter<$PrismaModel>
  }

  export type FlightCreateWithoutAirlineInput = {
    id?: string
    flightNumber?: number
    expectedDeparture: Date | string
    expectedArrival: Date | string
    duration: number
    terminal: string
    gate: string
    status?: $Enums.FlightStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FlightUncheckedCreateWithoutAirlineInput = {
    id?: string
    flightNumber?: number
    expectedDeparture: Date | string
    expectedArrival: Date | string
    duration: number
    terminal: string
    gate: string
    status?: $Enums.FlightStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FlightCreateOrConnectWithoutAirlineInput = {
    where: FlightWhereUniqueInput
    create: XOR<FlightCreateWithoutAirlineInput, FlightUncheckedCreateWithoutAirlineInput>
  }

  export type FlightCreateManyAirlineInputEnvelope = {
    data: FlightCreateManyAirlineInput | FlightCreateManyAirlineInput[]
    skipDuplicates?: boolean
  }

  export type FlightUpsertWithWhereUniqueWithoutAirlineInput = {
    where: FlightWhereUniqueInput
    update: XOR<FlightUpdateWithoutAirlineInput, FlightUncheckedUpdateWithoutAirlineInput>
    create: XOR<FlightCreateWithoutAirlineInput, FlightUncheckedCreateWithoutAirlineInput>
  }

  export type FlightUpdateWithWhereUniqueWithoutAirlineInput = {
    where: FlightWhereUniqueInput
    data: XOR<FlightUpdateWithoutAirlineInput, FlightUncheckedUpdateWithoutAirlineInput>
  }

  export type FlightUpdateManyWithWhereWithoutAirlineInput = {
    where: FlightScalarWhereInput
    data: XOR<FlightUpdateManyMutationInput, FlightUncheckedUpdateManyWithoutAirlineInput>
  }

  export type FlightScalarWhereInput = {
    AND?: FlightScalarWhereInput | FlightScalarWhereInput[]
    OR?: FlightScalarWhereInput[]
    NOT?: FlightScalarWhereInput | FlightScalarWhereInput[]
    id?: StringFilter<"Flight"> | string
    flightNumber?: IntFilter<"Flight"> | number
    expectedDeparture?: DateTimeFilter<"Flight"> | Date | string
    expectedArrival?: DateTimeFilter<"Flight"> | Date | string
    duration?: IntFilter<"Flight"> | number
    terminal?: StringFilter<"Flight"> | string
    gate?: StringFilter<"Flight"> | string
    airlineId?: StringFilter<"Flight"> | string
    status?: EnumFlightStatusFilter<"Flight"> | $Enums.FlightStatus
    createdAt?: DateTimeFilter<"Flight"> | Date | string
    updatedAt?: DateTimeFilter<"Flight"> | Date | string
  }

  export type AirlineCreateWithoutFlightsInput = {
    id?: string
    name: string
    country: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AirlineUncheckedCreateWithoutFlightsInput = {
    id?: string
    name: string
    country: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AirlineCreateOrConnectWithoutFlightsInput = {
    where: AirlineWhereUniqueInput
    create: XOR<AirlineCreateWithoutFlightsInput, AirlineUncheckedCreateWithoutFlightsInput>
  }

  export type AirlineUpsertWithoutFlightsInput = {
    update: XOR<AirlineUpdateWithoutFlightsInput, AirlineUncheckedUpdateWithoutFlightsInput>
    create: XOR<AirlineCreateWithoutFlightsInput, AirlineUncheckedCreateWithoutFlightsInput>
    where?: AirlineWhereInput
  }

  export type AirlineUpdateToOneWithWhereWithoutFlightsInput = {
    where?: AirlineWhereInput
    data: XOR<AirlineUpdateWithoutFlightsInput, AirlineUncheckedUpdateWithoutFlightsInput>
  }

  export type AirlineUpdateWithoutFlightsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AirlineUncheckedUpdateWithoutFlightsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FlightCreateManyAirlineInput = {
    id?: string
    flightNumber?: number
    expectedDeparture: Date | string
    expectedArrival: Date | string
    duration: number
    terminal: string
    gate: string
    status?: $Enums.FlightStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FlightUpdateWithoutAirlineInput = {
    id?: StringFieldUpdateOperationsInput | string
    flightNumber?: IntFieldUpdateOperationsInput | number
    expectedDeparture?: DateTimeFieldUpdateOperationsInput | Date | string
    expectedArrival?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    terminal?: StringFieldUpdateOperationsInput | string
    gate?: StringFieldUpdateOperationsInput | string
    status?: EnumFlightStatusFieldUpdateOperationsInput | $Enums.FlightStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FlightUncheckedUpdateWithoutAirlineInput = {
    id?: StringFieldUpdateOperationsInput | string
    flightNumber?: IntFieldUpdateOperationsInput | number
    expectedDeparture?: DateTimeFieldUpdateOperationsInput | Date | string
    expectedArrival?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    terminal?: StringFieldUpdateOperationsInput | string
    gate?: StringFieldUpdateOperationsInput | string
    status?: EnumFlightStatusFieldUpdateOperationsInput | $Enums.FlightStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FlightUncheckedUpdateManyWithoutAirlineInput = {
    id?: StringFieldUpdateOperationsInput | string
    flightNumber?: IntFieldUpdateOperationsInput | number
    expectedDeparture?: DateTimeFieldUpdateOperationsInput | Date | string
    expectedArrival?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    terminal?: StringFieldUpdateOperationsInput | string
    gate?: StringFieldUpdateOperationsInput | string
    status?: EnumFlightStatusFieldUpdateOperationsInput | $Enums.FlightStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}