export default _hyperscript;
export type conversions = any;
export type DynamicConverter = (str: string, value: any) => any;
export type Token = {
    type?: string | undefined;
    value: string;
    start?: number | undefined;
    end?: number | undefined;
    column?: number | undefined;
    line?: number | undefined;
    /**
     * `true` if this token represents an operator
     */
    op?: boolean | undefined;
    /**
     * `true` if this token is a template, for class refs, id refs, strings
     */
    template?: boolean | undefined;
};
export type ObjectDescriptor<D> = D & ThisType<D>;
export type ASTNode<N = {}> = {
    isFeature?: boolean | undefined;
    type?: string | undefined;
    args?: any[] | undefined;
    op?: ((context: Context, root: any, ...args: any) => any) | undefined;
    evaluate?: ((context: Context) => any) | undefined;
    parent?: ASTNode<{}> | undefined;
    children?: Set<ASTNode<{}>> | undefined;
    root?: ASTNode<{}> | undefined;
    keyword?: string | undefined;
    endToken?: Token | undefined;
    next?: ASTNode<{}> | undefined;
    resolveNext?: ((context: Context) => ASTNode) | undefined;
    eventSource?: EventSource | undefined;
    install?: (() => void) | undefined;
    execute?: ((context: Context) => void) | undefined;
    apply?: ((target: object, source: object, args?: object) => void) | undefined;
    css?: string | undefined;
} & N & ThisType<{
    isFeature?: boolean | undefined;
    type?: string | undefined;
    args?: any[] | undefined;
    op?: ((context: Context, root: any, ...args: any) => any) | undefined;
    evaluate?: ((context: Context) => any) | undefined;
    parent?: ASTNode<{}> | undefined;
    children?: Set<ASTNode<{}>> | undefined;
    root?: ASTNode<{}> | undefined;
    keyword?: string | undefined;
    endToken?: Token | undefined;
    next?: ASTNode<{}> | undefined;
    resolveNext?: ((context: Context) => ASTNode) | undefined;
    eventSource?: EventSource | undefined;
    install?: (() => void) | undefined;
    execute?: ((context: Context) => void) | undefined;
    apply?: ((target: object, source: object, args?: object) => void) | undefined;
    css?: string | undefined;
} & N>;
export type ParseRule<N = {}> = (parser: Parser, runtime: Runtime, tokens: Tokens, root?: any) => ASTNode<N> | undefined;
export type ContextLike = {
    locals: {
        [name: string]: unknown;
    };
    me: unknown;
    result: unknown;
    you: unknown;
    meta?: {
        context?: {
            detail?: unknown;
        } | undefined;
        lexer?: Lexer | undefined;
        parser?: Parser | undefined;
        runtime?: Runtime | undefined;
    } | undefined;
};
export type HyperscriptAPI = {
    config: {
        attributes: string;
        defaultTransition: string;
        disableSelector: string;
        conversions: typeof conversions;
    };
    use: (plugin: (_hyperscript: HyperscriptAPI) => void) => void;
    internals: {
        lexer: Lexer;
        Lexer: typeof Lexer;
        parser: Parser;
        Parser: typeof Parser;
        runtime: Runtime;
        Runtime: typeof Runtime;
        Tokens: typeof Tokens;
    };
    ElementCollection: typeof ElementCollection;
    addFeature: (keyword: string, definition: ParseRule) => void;
    addCommand: (keyword: string, definition: ParseRule) => void;
    addLeafExpression: (keyword: string, definition: ParseRule) => void;
    addIndirectExpression: (keyword: string, definition: ParseRule) => void;
    evaluate: (src: string, ctx?: Partial<Context>, args?: any) => any;
    parse: (src: string) => ASTNode;
    processNode: (node: Element) => void;
    version: string;
    browserInit: () => void;
};
export type Hyperscript = HyperscriptAPI & ((src: string, ctx?: Partial<Context>) => any);
declare const _hyperscript: any;
/**
 * @typedef {object} ContextLike
 * @property {{[name: string]: unknown}} locals
 * @property {unknown} me
 * @property {unknown} result
 * @property {unknown} you
 * @property {object} [meta]
 * @property {object} [meta.context]
 * @property {unknown} [meta.context.detail]
 * @property {Lexer} [meta.lexer]
 * @property {Parser} [meta.parser]
 * @property {Runtime} [meta.runtime]
 */
/**
 * @extends ContextLike
 */
declare class Context {
    /**
    * @param {*} owner
    * @param {*} feature
    * @param {*} hyperscriptTarget
    * @param {*} event
    * @param {Runtime} runtime
    */
    constructor(owner: any, feature: any, hyperscriptTarget: any, event: any, runtime: Runtime);
    meta: {
        parser: Parser;
        lexer: Lexer;
        runtime: Runtime;
        owner: any;
        feature: any;
        iterators: {};
        ctx: Context;
    };
    locals: {
        cookies: {};
    };
    me: any;
    you: any;
    result: any;
    event: any;
    target: any;
    detail: any;
    sender: any;
    body: HTMLElement | null;
}
/**
 * @template D
 * @typedef {D & ThisType<D>} ObjectDescriptor
 */
/**
 * @template [N={}]
 * @typedef {ObjectDescriptor<{
 *     isFeature?: boolean;
 *     type?: string;
 *     args?: any[];
 *     op?: (context: Context, root: any, ...args: any) => any;
 *     evaluate?: (context: Context) => any;
 *     parent?: ASTNode;
 *     children?: Set<ASTNode>;
 *     root?: ASTNode;
 *     keyword?: string;
 *     endToken?: Token;
 *     next?: ASTNode;
 *     resolveNext?: (context: Context) => ASTNode;
 *     eventSource?: EventSource;
 *     install?: () => void;
 *     execute?: (context: Context) => void;
 *     apply?: (target: object, source: object, args?: object) => void;
 *     css?: string;
 * } & N>} ASTNode
 */
/**
 * @template [N={}]
 * @callback ParseRule
 * @param {Parser} parser
 * @param {Runtime} runtime
 * @param {Tokens} tokens
 * @param {*} [root]
 * @returns {ASTNode<N> | undefined}
 */
declare class Parser {
    /**
     * @param {Tokens} tokens
     * @returns string
     */
    static createParserContext(tokens: Tokens): string;
    /**
     * @param {Tokens} tokens
     * @param {string} [message]
     * @returns {never}
     */
    static raiseParseError(tokens: Tokens, message?: string | undefined): never;
    /**
     * @param {Runtime} runtime
     */
    constructor(runtime: Runtime);
    runtime: Runtime;
    possessivesDisabled: boolean;
    /**
     * @template {Parser} This
     * @this {This}
     * @param {(that: This) => void} plugin
     * @returns {This}
     */
    use<This extends Parser>(this: This, plugin: (that: This) => void): This;
    /** @type {{[name: string]: ParseRule}} */
    GRAMMAR: {
        [name: string]: ParseRule<{}>;
    };
    /** @type {{[name: string]: ParseRule}} */
    COMMANDS: {
        [name: string]: ParseRule<{}>;
    };
    /** @type {{[name: string]: ParseRule}} */
    FEATURES: {
        [name: string]: ParseRule<{}>;
    };
    /** @type {string[]} */
    LEAF_EXPRESSIONS: string[];
    /** @type {string[]} */
    INDIRECT_EXPRESSIONS: string[];
    /**
     * @typedef {object} ParseElement
     * @property {Token} startToken
     * @property {Token} [endToken]
     * @property {() => string} sourceFor
     * @property {() => string} lineFor
     * @property {string} programSource
     */
    /**
     * @template {Partial<ParseElement>} T
     * @param {T} parseElement
     * @param {Token} start
     * @param {Tokens} tokens
     * @returns {asserts parseElement is T & ParseElement}
     */
    initElt<T extends Partial<{
        startToken: Token;
        endToken?: Token | undefined;
        sourceFor: () => string;
        lineFor: () => string;
        programSource: string;
    }>>(parseElement: T, start: Token, tokens: Tokens): asserts parseElement is T & {
        startToken: Token;
        endToken?: Token | undefined;
        sourceFor: () => string;
        lineFor: () => string;
        programSource: string;
    };
    /**
     * @template {keyof typeof this.GRAMMAR} [Type=string]
     * @param {Type} type
     * @param {Tokens} tokens
     * @param {ASTNode} [root]
     * @returns {ASTNode<ParseElement> | undefined}
     */
    parseElement<Type extends string | number = string>(type: Type, tokens: Tokens, root?: ASTNode<{}> | undefined): ASTNode<{
        startToken: Token;
        endToken?: Token | undefined;
        sourceFor: () => string;
        lineFor: () => string;
        programSource: string;
    }> | undefined;
    /**
     * @template {string} Type
     * @param {Type} type
     * @param {Tokens} tokens
     * @param {string} [message]
     * @param {*} [root]
     * @returns {ReturnType<typeof this.GRAMMAR[Type]> & ParseElement}
     */
    requireElement<Type_1 extends string>(type: Type_1, tokens: Tokens, message?: string | undefined, root?: any): {
        isFeature?: boolean | undefined;
        type?: string | undefined;
        args?: any[] | undefined;
        op?: ((context: Context, root: any, ...args: any) => any) | undefined;
        evaluate?: ((context: Context) => any) | undefined;
        parent?: ASTNode<{}> | undefined;
        children?: Set<ASTNode<{}>> | undefined;
        root?: ASTNode<{}> | undefined;
        keyword?: string | undefined;
        endToken?: Token | undefined;
        next?: ASTNode<{}> | undefined;
        resolveNext?: ((context: Context) => ASTNode) | undefined;
        eventSource?: EventSource | undefined;
        install?: (() => void) | undefined;
        execute?: ((context: Context) => void) | undefined;
        apply?: ((target: object, source: object, args?: object) => void) | undefined;
        css?: string | undefined;
    } & ThisType<{
        isFeature?: boolean | undefined;
        type?: string | undefined;
        args?: any[] | undefined;
        op?: ((context: Context, root: any, ...args: any) => any) | undefined;
        evaluate?: ((context: Context) => any) | undefined;
        parent?: ASTNode<{}> | undefined;
        children?: Set<ASTNode<{}>> | undefined;
        root?: ASTNode<{}> | undefined;
        keyword?: string | undefined;
        endToken?: Token | undefined;
        next?: ASTNode<{}> | undefined;
        resolveNext?: ((context: Context) => ASTNode) | undefined;
        eventSource?: EventSource | undefined;
        install?: (() => void) | undefined;
        execute?: ((context: Context) => void) | undefined;
        apply?: ((target: object, source: object, args?: object) => void) | undefined;
        css?: string | undefined;
    }> & {
        startToken: Token;
        endToken?: Token | undefined;
        sourceFor: () => string;
        lineFor: () => string;
        programSource: string;
    };
    /**
     * @param {string[]} types
     * @param {Tokens} tokens
     * @returns {ASTNode | undefined}
     */
    parseAnyOf(types: string[], tokens: Tokens): ASTNode | undefined;
    /**
     * @template {string} [Name=string]
     * @param {Name} name
     * @param {typeof this.GRAMMAR[Name]} definition
     */
    addGrammarElement<Name extends string = string>(name: Name, definition: ParseRule<{}>): void;
    /**
     * @template N
     * @param {string} keyword
     * @param {ParseRule<N>} definition
     */
    addCommand<N>(keyword: string, definition: ParseRule<N>): void;
    /**
     * @template {string} Keyword
     * @param {Keyword} keyword
     * @param {typeof this.GRAMMAR[`${Keyword}Feature`] & (typeof this.FEATURES)[Keyword]} definition
     */
    addFeature<Keyword extends string>(keyword: Keyword, definition: ParseRule<{}>): void;
    /**
     * @template {string} [Name=string]
     * @param {Name} name
     * @param {typeof this.GRAMMAR[Name]} definition
     */
    addLeafExpression<Name_1 extends string = string>(name: Name_1, definition: ParseRule<{}>): void;
    /**
     * @template {string} [Name=string]
     * @param {Name} name
     * @param {typeof this.GRAMMAR[Name]} definition
     */
    addIndirectExpression<Name_2 extends string = string>(name: Name_2, definition: ParseRule<{}>): void;
    /**
     * @param {Tokens} tokens
     * @param {string} [message]
     * @returns {never}
     */
    raiseParseError(tokens: Tokens, message?: string | undefined): never;
    /**
     * @param {Tokens} tokens
     * @returns {ASTNode | undefined}
     */
    parseHyperScript(tokens: Tokens): ASTNode | undefined;
    /**
     * @param {ASTNode | undefined} elt
     * @param {ASTNode} parent
     */
    setParent(elt: ASTNode | undefined, parent: ASTNode): void;
    /**
     * @param {Token} token
     * @returns {ParseRule}
     */
    commandStart(token: Token): ParseRule;
    /**
     * @param {Token} token
     * @returns {ParseRule}
     */
    featureStart(token: Token): ParseRule;
    /**
     * @param {Token} token
     * @returns {boolean}
     */
    commandBoundary(token: Token): boolean;
    /**
     * @param {Tokens} tokens
     * @returns {(string | ASTNode)[]}
     */
    parseStringTemplate(tokens: Tokens): (string | ASTNode)[];
    /**
     * @param {ASTNode} commandList
     */
    ensureTerminated(commandList: ASTNode): void;
}
declare class Runtime {
    static HALT: {};
    /**
     * @param {Lexer} [lexer]
     * @param {Parser} [parser]
     */
    constructor(lexer?: Lexer | undefined, parser?: Parser | undefined);
    /** @type {Lexer} */ lexer: Lexer;
    /** @type {Parser} */ parser: Parser;
    /**
     * @param {Element} elt
     * @param {string} selector
     * @returns boolean
     */
    matchesSelector(elt: Element, selector: string): any;
    /**
     * @param {string} eventName
     * @param {Object} [detail]
     * @returns {Event}
     */
    makeEvent(eventName: string, detail?: any): Event;
    /**
     * @param {Element} elt
     * @param {string} eventName
     * @param {Object} [detail]
     * @param {Element} [sender]
     * @returns {boolean}
     */
    triggerEvent(elt: Element, eventName: string, detail?: any, sender?: Element | undefined): boolean;
    /**
     * isArrayLike returns `true` if the provided value is an array or
     * a NodeList (which is close enough to being an array for our purposes).
     *
     * @param {any} value
     * @returns {value is Array | NodeList}
     */
    isArrayLike(value: any): value is any[] | NodeList;
    /**
     * isIterable returns `true` if the provided value supports the
     * iterator protocol.
     *
     * @param {any} value
     * @returns {value is Iterable}
     */
    isIterable(value: any): value is Iterable<any>;
    /**
     * shouldAutoIterate returns `true` if the provided value
     * should be implicitly iterated over when accessing properties,
     * and as the target of some commands.
     *
     * Currently, this is when the value is an {ElementCollection}
     * or {isArrayLike} returns true.
     *
     * @param {any} value
     * @returns {value is (any[] | ElementCollection)}
     */
    shouldAutoIterate(value: any): value is any[] | ElementCollection;
    /**
     * forEach executes the provided `func` on every item in the `value` array.
     * if `value` is a single item (and not an array) then `func` is simply called
     * once.  If `value` is null, then no further actions are taken.
     *
     * @template T
     * @param {T | Iterable<T>} value
     * @param {(item: T) => void} func
     */
    forEach<T>(value: T | Iterable<T>, func: (item: T) => void): void;
    /**
     * implicitLoop executes the provided `func` on:
     * - every item of {value}, if {value} should be auto-iterated
     *   (see {shouldAutoIterate})
     * - {value} otherwise
     *
     * @template T
     * @param {ElementCollection | T | T[]} value
     * @param {(item: T) => void} func
     */
    implicitLoop<T_1>(value: T_1 | ElementCollection | T_1[], func: (item: T_1) => void): void;
    wrapArrays(args: any): any[];
    unwrapAsyncs(values: any): void;
    HALT: {};
    /**
     * @param {ASTNode} command
     * @param {Context} ctx
     */
    unifiedExec(command: ASTNode, ctx: Context): void;
    /**
    * @param {*} parseElement
    * @param {Context} ctx
    * @returns {*}
    */
    unifiedEval(parseElement: any, ctx: Context): any;
    /**
     * @type {string[] | null}
     */
    _scriptAttrs: string[] | null;
    /**
    * getAttributes returns the attribute name(s) to use when
    * locating hyperscript scripts in a DOM element.  If no value
    * has been configured, it defaults to config.attributes
    * @returns string[]
    */
    getScriptAttributes(): string[];
    /**
    * @param {Element} elt
    * @returns {string | null}
    */
    getScript(elt: Element): string | null;
    hyperscriptFeaturesMap: WeakMap<object, any>;
    /**
    * @param {*} elt
    * @returns {Object}
    */
    getHyperscriptFeatures(elt: any): any;
    /**
    * @param {Object} owner
    * @param {Context} ctx
    */
    addFeatures(owner: any, ctx: Context): void;
    /**
    * @param {*} owner
    * @param {*} feature
    * @param {*} hyperscriptTarget
    * @param {*} event
    * @returns {Context}
    */
    makeContext(owner: any, feature: any, hyperscriptTarget: any, event: any): Context;
    /**
    * @returns string
    */
    getScriptSelector(): string;
    /**
    * @param {any} value
    * @param {string} type
    * @returns {any}
    */
    convertValue(value: any, type: string): any;
    /**
    * @param {string} src
    * @returns {ASTNode}
    */
    parse(src: string): ASTNode;
    /**
     *
     * @param {ASTNode & ParseElement & Required<Pick<ASTNode, "evaluate">>} elt
     * @param {Context} ctx
     * @returns {any}
     */
    evaluateNoPromise(elt: {
        isFeature?: boolean | undefined;
        type?: string | undefined;
        args?: any[] | undefined;
        op?: ((context: Context, root: any, ...args: any) => any) | undefined;
        evaluate?: ((context: Context) => any) | undefined;
        parent?: ASTNode<{}> | undefined;
        children?: Set<ASTNode<{}>> | undefined;
        root?: ASTNode<{}> | undefined;
        keyword?: string | undefined;
        endToken?: Token | undefined;
        next?: ASTNode<{}> | undefined;
        resolveNext?: ((context: Context) => ASTNode<{}>) | undefined;
        eventSource?: EventSource | undefined;
        install?: (() => void) | undefined;
        execute?: ((context: Context) => void) | undefined;
        apply?: ((target: any, source: any, args?: any) => void) | undefined;
        css?: string | undefined;
    } & ThisType<{
        isFeature?: boolean | undefined;
        type?: string | undefined;
        args?: any[] | undefined;
        op?: ((context: Context, root: any, ...args: any) => any) | undefined;
        evaluate?: ((context: Context) => any) | undefined;
        parent?: ASTNode<{}> | undefined;
        children?: Set<ASTNode<{}>> | undefined;
        root?: ASTNode<{}> | undefined;
        keyword?: string | undefined;
        endToken?: Token | undefined;
        next?: ASTNode<{}> | undefined;
        resolveNext?: ((context: Context) => ASTNode<{}>) | undefined;
        eventSource?: EventSource | undefined;
        install?: (() => void) | undefined;
        execute?: ((context: Context) => void) | undefined;
        apply?: ((target: any, source: any, args?: any) => void) | undefined;
        css?: string | undefined;
    }> & {
        startToken: Token;
        endToken?: Token | undefined;
        sourceFor: () => string;
        lineFor: () => string;
        programSource: string;
    } & Required<Pick<ASTNode<{}>, "evaluate">>, ctx: Context): any;
    /**
    * @param {string} src
    * @param {Partial<Context>} [ctx]
    * @param {Object} [args]
    * @returns {any}
    */
    evaluate(src: string, ctx?: Partial<Context> | undefined, args?: any): any;
    /**
    * @param {Element | Document} elt
    */
    processNode(elt: Element | Document): void;
    /**
    * @param {Element} elt
    * @param {Element} [target]
    */
    initElement(elt: Element, target?: Element | undefined): void;
    internalDataMap: WeakMap<object, any>;
    /**
    * @param {Element} elt
    * @returns {Object}
    */
    getInternalData(elt: Element): any;
    /**
    * @param {any} value
    * @param {string} typeString
    * @param {boolean} [nullOk]
    * @returns {boolean}
    */
    typeCheck(value: any, typeString: string, nullOk?: boolean | undefined): boolean;
    getElementScope(context: any): any;
    /**
    * @param {string} str
    * @returns {boolean}
    */
    isReservedWord(str: string): boolean;
    /**
    * @param {ContextLike} context
    * @returns {context is Context}
    */
    isHyperscriptContext(context: ContextLike): context is Context;
    /**
    * @param {string} str
    * @param {ContextLike} context
    * @param {string} [type]
    * @returns {any}
    */
    resolveSymbol(str: string, context: ContextLike, type?: string | undefined): any;
    /**
     * @param {string} str
     * @param {ContextLike} context
     * @param {string | undefined} type
     * @param {any} value
     */
    setSymbol(str: string, context: ContextLike, type: string | undefined, value: any): void;
    /**
    * @param {ASTNode} command
    * @param {Context} context
    * @returns {undefined | ASTNode}
    */
    findNext(command: ASTNode, context: Context): undefined | ASTNode;
    /**
    * @param {Object<string,any>} root
    * @param {string} property
    * @param {Getter} getter
    * @returns {any}
    *
    * @callback Getter
    * @param {Object<string,any>} root
    * @param {string} property
    */
    flatGet(root: {
        [x: string]: any;
    }, property: string, getter: (root: {
        [x: string]: any;
    }, property: string) => any): any;
    resolveProperty(root: any, property: any): any;
    resolveAttribute(root: any, property: any): any;
    /**
     *
     * @param {Object<string, any>} root
     * @param {string} property
     * @returns {string}
     */
    resolveStyle(root: {
        [x: string]: any;
    }, property: string): string;
    /**
     *
     * @param {Object<string, any>} root
     * @param {string} property
     * @returns {string}
     */
    resolveComputedStyle(root: {
        [x: string]: any;
    }, property: string): string;
    /**
    * @param {Element} elt
    * @param {string[]} nameSpace
    * @param {string} name
    * @param {any} value
    */
    assignToNamespace(elt: Element, nameSpace: string[], name: string, value: any): void;
    getHyperTrace(ctx: any, thrown: any): any;
    registerHyperTrace(ctx: any, thrown: any): void;
    /**
    * @param {string} str
    * @returns {string}
    */
    escapeSelector(str: string): string;
    /**
    * @param {any} value
    * @param {*} elt
    */
    nullCheck(value: any, elt: any): void;
    /**
    * @param {any} value
    * @returns {boolean}
    */
    isEmpty(value: any): boolean;
    /**
    * @param {any} value
    * @returns {boolean}
    */
    doesExist(value: any): boolean;
    /**
    * @param {Node} node
    * @returns {Document|ShadowRoot}
    */
    getRootNode(node: Node): Document | ShadowRoot;
    /**
     *
     * @param {Element} elt
     * @param {ASTNode} onFeature
     * @returns {EventQueue}
     *
     * @typedef {{queue:Array, executing:boolean}} EventQueue
     */
    getEventQueueFor(elt: Element, onFeature: ASTNode): {
        queue: any[];
        executing: boolean;
    };
    beepValueToConsole(element: any, expression: any, value: any): void;
    /** @type string | null */
    hyperscriptUrl: string | null;
}
/**
 * @typedef {Object} Token
 * @property {string} [type]
 * @property {string} value
 * @property {number} [start]
 * @property {number} [end]
 * @property {number} [column]
 * @property {number} [line]
 * @property {boolean} [op] `true` if this token represents an operator
 * @property {boolean} [template] `true` if this token is a template, for class refs, id refs, strings
 */
declare class Tokens {
    /**
     * @this {ParseElement}
     * @returns {string}
     */
    static sourceFor: (this: {
        startToken: Token;
        endToken?: Token | undefined;
        sourceFor: () => string;
        lineFor: () => string;
        programSource: string;
    }) => string;
    /**
     * @this {ParseElement}
     * @returns {string}
     */
    static lineFor: (this: {
        startToken: Token;
        endToken?: Token | undefined;
        sourceFor: () => string;
        lineFor: () => string;
        programSource: string;
    }) => string;
    /**
     * @param {Token[]} tokens
     * @param {Token[]} consumed
     * @param {string} source
     */
    constructor(tokens: Token[], consumed: Token[], source: string);
    /** @type {Token[]} */
    tokens: Token[];
    /** @type {Token[]} */
    consumed: Token[];
    /** @type {string} */
    source: string;
    /**
     * @returns {Token[]}
     */
    get list(): Token[];
    /** @type Token | undefined */
    _lastConsumed: Token | undefined;
    consumeWhitespace(): void;
    /**
     * @param {Tokens} tokens
     * @param {string} error
     * @returns {never}
     */
    raiseError(tokens: Tokens, error: string): never;
    /**
     * @param {string} value
     * @returns {Token}
     */
    requireOpToken(value: string): Token;
    /**
     * @param {string} op1
     * @param {string} [op2]
     * @param {string} [op3]
     * @returns {Token | undefined}
     */
    matchAnyOpToken(op1: string, op2?: string | undefined, op3?: string | undefined, ...args: any[]): Token | undefined;
    /**
     * @param {...string} op1
     * @returns {Token | undefined}
     */
    matchAnyToken(...args: string[]): Token | undefined;
    /**
     * @param {string} value
     * @returns {Token | undefined}
     */
    matchOpToken(value: string): Token | undefined;
    /**
     * @param {string} type1
     * @param {string} [type2]
     * @param {string} [type3]
     * @param {string} [type4]
     * @returns {Token}
     */
    requireTokenType(type1: string, type2?: string | undefined, type3?: string | undefined, type4?: string | undefined): Token;
    /**
     * @param {string} type1
     * @param {string} [type2]
     * @param {string} [type3]
     * @param {string} [type4]
     * @returns {Token | undefined}
     */
    matchTokenType(type1: string, type2?: string | undefined, type3?: string | undefined, type4?: string | undefined): Token | undefined;
    /**
     * @param {string} value
     * @param {string} [type]
     * @returns {Token}
     */
    requireToken(value: string, type?: string | undefined): Token;
    /**
     * @param {string} value
     * @param {number} [peek]
     * @param {string} [type]
     * @returns {Token | undefined}
     */
    peekToken(value: string, peek?: number | undefined, type?: string | undefined): Token | undefined;
    /**
     * @param {string} value
     * @param {string} [type]
     * @returns {Token | undefined}
     */
    matchToken(value: string, type?: string | undefined): Token | undefined;
    /**
     * @returns {Token}
     */
    consumeToken(): Token;
    /**
     * @param {string | null} value
     * @param {string | null} [type]
     * @returns {Token[]}
     */
    consumeUntil(value: string | null, type?: string | null | undefined): Token[];
    /**
     * @returns {string}
     */
    lastWhitespace(): string;
    consumeUntilWhitespace(): Token[];
    /**
     * @returns {boolean}
     */
    hasMore(): boolean;
    /**
     * @param {number} n
     * @param {boolean} [dontIgnoreWhitespace]
     * @returns {Token}
     */
    token(n: number, dontIgnoreWhitespace?: boolean | undefined): Token;
    /**
     * @returns {Token}
     */
    currentToken(): Token;
    /**
     * @returns {Token | undefined}
     */
    lastMatch(): Token | undefined;
    /** @type {string[]} */
    follows: string[];
    /**
     * @param {string} str
     */
    pushFollow(str: string): void;
    popFollow(): void;
    clearFollows(): string[];
    /**
     * @param {string[]} f
     */
    restoreFollows(f: string[]): void;
}
declare namespace conversions {
    let dynamicResolvers: DynamicConverter[];
    function String(val: any): any;
    function Int(val: string): number;
    function Float(val: string): number;
    function Number(val: any): number;
    function Date(val: string | number | Date): Date;
    function Array<T>(val: Iterable<T> | ArrayLike<T>): T[];
    function JSON(val: any): string;
    function Object(val: any): any;
}
declare class Lexer {
    static OP_TABLE: {
        "+": string;
        "-": string;
        "*": string;
        "/": string;
        ".": string;
        "..": string;
        "\\": string;
        ":": string;
        "%": string;
        "|": string;
        "!": string;
        "?": string;
        "#": string;
        "&": string;
        $: string;
        ";": string;
        ",": string;
        "(": string;
        ")": string;
        "<": string;
        ">": string;
        "<=": string;
        ">=": string;
        "==": string;
        "===": string;
        "!=": string;
        "!==": string;
        "{": string;
        "}": string;
        "[": string;
        "]": string;
        "=": string;
    };
    /**
     * isValidCSSClassChar returns `true` if the provided character is valid in a CSS class.
     * @param {string} c
     * @returns boolean
     */
    static isValidCSSClassChar(c: string): boolean;
    /**
     * isValidCSSIDChar returns `true` if the provided character is valid in a CSS ID
     * @param {string} c
     * @returns boolean
     */
    static isValidCSSIDChar(c: string): boolean;
    /**
     * isWhitespace returns `true` if the provided character is whitespace.
     * @param {string} c
     * @returns boolean
     */
    static isWhitespace(c: string): boolean;
    /**
     * positionString returns a string representation of a Token's line and column details.
     * @param {Token} token
     * @returns string
     */
    static positionString(token: Token): string;
    /**
     * isNewline returns `true` if the provided character is a carriage return or newline
     * @param {string} c
     * @returns boolean
     */
    static isNewline(c: string): boolean;
    /**
     * isNumeric returns `true` if the provided character is a number (0-9)
     * @param {string} c
     * @returns boolean
     */
    static isNumeric(c: string): boolean;
    /**
     * isAlpha returns `true` if the provided character is a letter in the alphabet
     * @param {string} c
     * @returns boolean
     */
    static isAlpha(c: string): boolean;
    /**
     * @param {string} c
     * @param {boolean} [dollarIsOp]
     * @returns boolean
     */
    static isIdentifierChar(c: string, dollarIsOp?: boolean | undefined): boolean;
    /**
     * @param {string} c
     * @returns boolean
     */
    static isReservedChar(c: string): boolean;
    /**
     * @param {Token[]} tokens
     * @returns {boolean}
     */
    static isValidSingleQuoteStringStart(tokens: Token[]): boolean;
    /**
     * @param {string} string
     * @param {boolean} [template]
     * @returns {Tokens}
     */
    static tokenize(string: string, template?: boolean | undefined): Tokens;
    /**
     * @param {string} string
     * @param {boolean} [template]
     * @returns {Tokens}
     */
    tokenize(string: string, template?: boolean | undefined): Tokens;
}
declare class ElementCollection {
    constructor(css: any, relativeToElement: any, escape: any);
    _css: any;
    relativeToElement: any;
    escape: any;
    get css(): any;
    get className(): any;
    get id(): any;
    contains(elt: any): boolean;
    get length(): number;
    selectMatches(): NodeListOf<any>;
    [Symbol.iterator](): IterableIterator<any>;
}
//# sourceMappingURL=_hyperscript.d.mts.map