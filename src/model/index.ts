//Relation
export interface EntityRelation {
    entityId: string
    entityName: string
    relationship: string
    relatedEntityId: string
    relatedEntityName: string
}

// BoundedContext(container of SubDomain) and SubDomain
// includes one or many IAggregate
export interface BoundedContext {
    name: string
    entities: EntityRelation[]
}

// Domain
export interface Domain {
    name: string
    boundedContexts: BoundedContext[]
}

// ContextMapping
export interface ContextMapping {
    domains: Domain[]
    relationships: EntityRelation[]
}
