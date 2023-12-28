export default _hyperscript;
export type DynamicConverter = (str: string, value: any) => any;
export type Token = {
    type?: string;
    value: string;
    start?: number;
    end?: number;
    column?: number;
    line?: number;
    /**
     * `true` if this token represents an operator
     */
    op?: boolean;
    /**
     * `true` if this token is a template, for class refs, id refs, strings
     */
    template?: boolean;
};
export type ParseRule = (parser: Parser, runtime: Runtime, tokens: Tokens, root?: any) => ASTNode | undefined;
export type ASTNode = any;
export type HyperscriptAPI = {
    config: {
        attributes: string;
        defaultTransition: string;
        disableSelector: string;
        conversions: typeof conversions;
    };
    internals: {
        lexer: Lexer;
        Lexer: typeof Lexer;
        parser: Parser;
        Parser: typeof Parser;
        runtime: Runtime;
        Runtime: typeof Runtime;
    };
    ElementCollection: typeof ElementCollection;
    addFeature: (keyword: string, definition: ParseRule) => void;
    addCommand: (keyword: string, definition: ParseRule) => void;
    addLeafExpression: (keyword: string, definition: ParseRule) => void;
    addIndirectExpression: (keyword: string, definition: ParseRule) => void;
    evaluate: (src: string, ctx?: Partial<Context>, args?: any) => any;
    parse: (src: string) => ASTNode;
    processNode: (node: Element) => void;
    browserInit: () => void;
};
export type Hyperscript = HyperscriptAPI & ((src: string, ctx?: Partial<Context>) => any);
/**
 * @typedef {Object} HyperscriptAPI
 *
 * @property {Object} config
 * @property {string} config.attributes
 * @property {string} config.defaultTransition
 * @property {string} config.disableSelector
 * @property {typeof conversions} config.conversions
 *
 * @property {Object} internals
 * @property {Lexer} internals.lexer
 * @property {typeof Lexer} internals.Lexer
 * @property {Parser} internals.parser
 * @property {typeof Parser} internals.Parser
 * @property {Runtime} internals.runtime
 * @property {typeof Runtime} internals.Runtime
 *
 * @property {typeof ElementCollection} ElementCollection
 *
 * @property {(keyword: string, definition: ParseRule) => void} addFeature
 * @property {(keyword: string, definition: ParseRule) => void} addCommand
 * @property {(keyword: string, definition: ParseRule) => void} addLeafExpression
 * @property {(keyword: string, definition: ParseRule) => void} addIndirectExpression
 *
 * @property {(src: string, ctx?: Partial<Context>, args?: Object) => any} evaluate
 * @property {(src: string) => ASTNode} parse
 * @property {(node: Element) => void} processNode
 *
 * @property {() => void} browserInit
 *
 *
 * @typedef {HyperscriptAPI & ((src: string, ctx?: Partial<Context>) => any)} Hyperscript
 */
/**
 * @type {Hyperscript}
 */
declare const _hyperscript: Hyperscript;
/**
 * @callback ParseRule
 * @param {Parser} parser
 * @param {Runtime} runtime
 * @param {Tokens} tokens
 * @param {*} [root]
 * @returns {ASTNode | undefined}
 *
 * @typedef {Object} ASTNode
 * @member {boolean} isFeature
 * @member {string} type
 * @member {any[]} args
 * @member {(this: ASTNode, ctx:Context, root:any, ...args:any) => any} op
 * @member {(this: ASTNode, context?:Context) => any} evaluate
 * @member {ASTNode} parent
 * @member {Set<ASTNode>} children
 * @member {ASTNode} root
 * @member {String} keyword
 * @member {Token} endToken
 * @member {ASTNode} next
 * @member {(context:Context) => ASTNode} resolveNext
 * @member {EventSource} eventSource
 * @member {(this: ASTNode) => void} install
 * @member {(this: ASTNode, context:Context) => void} execute
 * @member {(this: ASTNode, target: object, source: object, args?: Object) => void} apply
 *
 *
 */
declare class Parser {
    /**
     *
     * @param {Tokens} tokens
     * @returns string
     */
    static createParserContext(tokens: Tokens): string;
    /**
     * @param {Tokens} tokens
     * @param {string} [message]
     * @returns {never}
     */
    static raiseParseError(tokens: Tokens, message?: string): never;
    /**
     *
     * @param {Runtime} runtime
     */
    constructor(runtime: Runtime);
    runtime: Runtime;
    possessivesDisabled: boolean;
    use(plugin: any): this;
    /** @type {Object<string,ParseRule>} */
    GRAMMAR: {
        [x: string]: ParseRule;
    };
    /** @type {Object<string,ParseRule>} */
    COMMANDS: {
        [x: string]: ParseRule;
    };
    /** @type {Object<string,ParseRule>} */
    FEATURES: {
        [x: string]: ParseRule;
    };
    /** @type {string[]} */
    LEAF_EXPRESSIONS: string[];
    /** @type {string[]} */
    INDIRECT_EXPRESSIONS: string[];
    /**
     * @param {*} parseElement
     * @param {*} start
     * @param {Tokens} tokens
     */
    initElt(parseElement: any, start: any, tokens: Tokens): void;
    /**
     * @param {string} type
     * @param {Tokens} tokens
     * @param {ASTNode?} root
     * @returns {ASTNode}
     */
    parseElement(type: string, tokens: Tokens, root?: ASTNode | null): ASTNode;
    /**
     * @param {string} type
     * @param {Tokens} tokens
     * @param {string} [message]
     * @param {*} [root]
     * @returns {ASTNode}
     */
    requireElement(type: string, tokens: Tokens, message?: string, root?: any): ASTNode;
    /**
     * @param {string[]} types
     * @param {Tokens} tokens
     * @returns {ASTNode}
     */
    parseAnyOf(types: string[], tokens: Tokens): ASTNode;
    /**
     * @param {string} name
     * @param {ParseRule} definition
     */
    addGrammarElement(name: string, definition: ParseRule): void;
    /**
     * @param {string} keyword
     * @param {ParseRule} definition
     */
    addCommand(keyword: string, definition: ParseRule): void;
    /**
     * @param {string} keyword
     * @param {ParseRule} definition
     */
    addFeature(keyword: string, definition: ParseRule): void;
    /**
     * @param {string} name
     * @param {ParseRule} definition
     */
    addLeafExpression(name: string, definition: ParseRule): void;
    /**
     * @param {string} name
     * @param {ParseRule} definition
     */
    addIndirectExpression(name: string, definition: ParseRule): void;
    /**
     * @param {Tokens} tokens
     * @param {string} [message]
     */
    raiseParseError(tokens: Tokens, message?: string): void;
    /**
     * @param {Tokens} tokens
     * @returns {ASTNode}
     */
    parseHyperScript(tokens: Tokens): ASTNode;
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
     *
     * @param {Lexer} [lexer]
     * @param {Parser} [parser]
     */
    constructor(lexer?: Lexer, parser?: Parser);
    lexer: Lexer;
    parser: Parser;
    /**
     * @param {HTMLElement} elt
     * @param {string} selector
     * @returns boolean
     */
    matchesSelector(elt: HTMLElement, selector: string): any;
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
    triggerEvent(elt: Element, eventName: string, detail?: any, sender?: Element): boolean;
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
     * @param {ASTNode} elt
     * @param {Context} ctx
     * @returns {any}
     */
    evaluateNoPromise(elt: ASTNode, ctx: Context): any;
    /**
    * @param {string} src
    * @param {Partial<Context>} [ctx]
    * @param {Object} [args]
    * @returns {any}
    */
    evaluate(src: string, ctx?: Partial<Context>, args?: any): any;
    /**
    * @param {HTMLElement} elt
    */
    processNode(elt: HTMLElement): void;
    /**
    * @param {Element} elt
    * @param {Element} [target]
    */
    initElement(elt: Element, target?: Element): void;
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
    typeCheck(value: any, typeString: string, nullOk?: boolean): boolean;
    getElementScope(context: any): any;
    /**
    * @param {string} str
    * @returns {boolean}
    */
    isReservedWord(str: string): boolean;
    /**
    * @param {any} context
    * @returns {boolean}
    */
    isHyperscriptContext(context: any): boolean;
    /**
    * @param {string} str
    * @param {Context} context
    * @returns {any}
    */
    resolveSymbol(str: string, context: Context, type: any): any;
    setSymbol(str: any, context: any, type: any, value: any): void;
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
     * @this {*}
     * @returns {string}
     */
    static sourceFor: (this: any) => string;
    /**
     * @this {*}
     * @returns {string}
     */
    static lineFor: (this: any) => string;
    constructor(tokens: any, consumed: any, source: any);
    tokens: any;
    consumed: any;
    source: any;
    get list(): any;
    /** @type Token | null */
    _lastConsumed: Token | null;
    consumeWhitespace(): void;
    /**
     * @param {Tokens} tokens
     * @param {*} error
     * @returns {never}
     */
    raiseError(tokens: Tokens, error: any): never;
    /**
     * @param {string} value
     * @returns {Token}
     */
    requireOpToken(value: string): Token;
    /**
     * @param {string} op1
     * @param {string} [op2]
     * @param {string} [op3]
     * @returns {Token | void}
     */
    matchAnyOpToken(op1: string, op2?: string, op3?: string, ...args: any[]): Token | void;
    /**
     * @param {string} op1
     * @param {string} [op2]
     * @param {string} [op3]
     * @returns {Token | void}
     */
    matchAnyToken(op1: string, op2?: string, op3?: string, ...args: any[]): Token | void;
    /**
     * @param {string} value
     * @returns {Token | void}
     */
    matchOpToken(value: string): Token | void;
    /**
     * @param {string} type1
     * @param {string} [type2]
     * @param {string} [type3]
     * @param {string} [type4]
     * @returns {Token}
     */
    requireTokenType(type1: string, type2?: string, type3?: string, type4?: string): Token;
    /**
     * @param {string} type1
     * @param {string} [type2]
     * @param {string} [type3]
     * @param {string} [type4]
     * @returns {Token | void}
     */
    matchTokenType(type1: string, type2?: string, type3?: string, type4?: string): Token | void;
    /**
     * @param {string} value
     * @param {string} [type]
     * @returns {Token}
     */
    requireToken(value: string, type?: string): Token;
    peekToken(value: any, peek: any, type: any): any;
    /**
     * @param {string} value
     * @param {string} [type]
     * @returns {Token | void}
     */
    matchToken(value: string, type?: string): Token | void;
    /**
     * @returns {Token}
     */
    consumeToken(): Token;
    /**
     * @param {string | null} value
     * @param {string | null} [type]
     * @returns {Token[]}
     */
    consumeUntil(value: string | null, type?: string | null): Token[];
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
    token(n: number, dontIgnoreWhitespace?: boolean): Token;
    /**
     * @returns {Token}
     */
    currentToken(): Token;
    /**
     * @returns {Token | null}
     */
    lastMatch(): Token | null;
    follows: any[];
    pushFollow(str: any): void;
    popFollow(): void;
    clearFollows(): any[];
    restoreFollows(f: any): void;
}
/**
 * @type {Object}
 * @property {DynamicConverter[]} dynamicResolvers
 *
 * @callback DynamicConverter
 * @param {String} str
 * @param {*} value
 * @returns {*}
 */
declare const conversions: any;
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
    static isIdentifierChar(c: string, dollarIsOp?: boolean): boolean;
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
    static tokenize(string: string, template?: boolean): Tokens;
    /**
     * @param {string} string
     * @param {boolean} [template]
     * @returns {Tokens}
     */
    tokenize(string: string, template?: boolean): Tokens;
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
declare class Context {
    /**
    * @param {*} owner
    * @param {*} feature
    * @param {*} hyperscriptTarget
    * @param {*} event
    */
    constructor(owner: any, feature: any, hyperscriptTarget: any, event: any, runtime: any);
    meta: {
        parser: any;
        lexer: any;
        runtime: any;
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
    body: HTMLElement;
}
//# sourceMappingURL=_hyperscript.d.mts.map