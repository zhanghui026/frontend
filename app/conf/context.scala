package conf

import com.gu.management.{ Switchable, TimingMetric, Healthcheck }
import common._

object Configuration extends Configuration("frontend-tag", webappConfDirectory = "env")

object ContentApi extends ContentApi(Configuration)

object Static extends Static(Configuration.static.path)

object Switches {
  //  val switch = new DefaultSwitch("name", "Description Text")
  val all: Seq[Switchable] = List(Healthcheck.switch)
}

object Metrics {
  //  val metric = new TimingMetric("frontend-article", "name", "title", "Description Text")
  val all: Seq[TimingMetric] = Nil
}
