import { eq } from "drizzle-orm";

import { database } from "../lib/database";
import { Event } from "../schemas/event";
import { events } from "../tables/events";

export type GetEventsByCategoryIdParams = {
  categoryId: number;
};

export const getEventsByCategoryId = async (
  params: GetEventsByCategoryIdParams,
) => {
  return await database
    .select()
    .from(events)
    .where(eq(events.categoryId, params.categoryId))
    .orderBy(events.datetime);
};

export type GetEventByIdParams = {
  id: number;
};

export const getEventById = async (params: GetEventByIdParams) => {
  const event = await database
    .select()
    .from(events)
    .where(eq(events.id, params.id))
    .then((rows) => rows.at(0));

  return event;
};

export type CreateEventPayload = Pick<
  Event,
  "datetime" | "description" | "categoryId"
>;

export const createEvent = async (payload: CreateEventPayload) => {
  const [event] = await database.insert(events).values(payload).returning();

  return event;
};

export type UpdateEventPayload = Pick<Event, "id"> &
  Partial<Pick<Event, "datetime" | "description">>;

export const updateEvent = async (payload: UpdateEventPayload) => {
  const [event] = await database
    .update(events)
    .set({
      datetime: payload.datetime,
      description: payload.description,
    })
    .where(eq(events.id, payload.id))
    .returning();

  return event;
};

export type DeleteEventPayload = Pick<Event, "id">;

export const deleteEvent = async (payload: DeleteEventPayload) => {
  const [event] = await database
    .delete(events)
    .where(eq(events.id, payload.id))
    .returning();

  return event;
};
