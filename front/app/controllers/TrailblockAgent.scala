package controllers

import model._
import common.{ Logging, AkkaSupport }
import model.Trailblock
import scala.Some
import model.TrailblockDescription
import com.gu.openplatform.contentapi.model.ItemResponse
import conf.ContentApi

/**
 * Responsible for refreshing one block on the front (e.g. the Sport block)
 */
class TrailblockAgent(val description: TrailblockDescription, edition: String) extends AkkaSupport with Logging {

  private lazy val agent = play_akka.agent[Option[Trailblock]](None)

  def refresh() = agent.sendOff { old => Some(Trailblock(description, loadTrails(description.id))) }

  def close() = agent.close()

  def trailblock: Option[Trailblock] = agent()

  private def loadTrails(id: String): Seq[Trail] = {
    val response: ItemResponse = ContentApi.item(id, edition)
      .showEditorsPicks(true)
      .pageSize(20)
      .response

    val editorsPicks = response.editorsPicks map { new Content(_) }
    val editorsPicksIds = editorsPicks map (_.id)
    val latest = response.results map { new Content(_) } filterNot (c => editorsPicksIds contains (c.id))

    editorsPicks ++ latest
  }

  private def loadStoryPackage(id: String): Seq[Trail] = {
    log.info("Refreshing story package for " + id + " for edition " + edition)
    val response: ItemResponse = ContentApi.item(id, edition)
      .showStoryPackage(true)
      .response

    response.storyPackage map { new Content(_) } filterNot (_.id == id)
  }
}

object TrailblockAgent {
  def apply(description: TrailblockDescription, edition: String): TrailblockAgent =
    new TrailblockAgent(description, edition)
}