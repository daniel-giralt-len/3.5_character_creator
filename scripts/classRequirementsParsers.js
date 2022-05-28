const getBonuses = v => {
  const willR = RegExp(/Will(?:.*?)([0-9]+)/)
  const fortR = RegExp(/Fort(?:.*?)([0-9]+)/)
  const refR = RegExp(/Ref(?:.*?)([0-9]+)/)
  const wR = willR.exec(v)
  const fR = fortR.exec(v)
  const rR = refR.exec(v)
  if(!(wR||fR||rR)){return v}
  return {
    will: (wR || [])[1],
    fortitude: (fR || [])[1],
    reflex: (rR || [])[1],
  }
}

module.exports = [
  ["base attack bonus",v=>(['bab',v])],
  //["feats","array"],
  //["spellcasting","string"],
  //["special","string"],
  ["alignment",v=>(['alignment', v.toLowerCase().split(/, or | or |,/g)])],
  //["skills","array"],
  //["type","string"],
  //["languages","string"],
  //["spells or spell-like abilities","string"],
  //["spells","string"],
  ["base save bonus",v=>(['base save bonus',getBonuses(v)])],
  //["race","string"],
  ["base save bonuses",v=>(['base save bonus',getBonuses(v)])],
  //["patron deity","string"],
  //["gender","string"],
  //["skill tricks","string"],
  ["sneak attack damage","string"],
  ["martial maneuvers","string"],
  ["language","string"],
  ["equipment","string"],
  ["psionics","string"],
  ["base fort save bonus","string"],
  ["base reflex save bonus","string"],
  ["base will save bonus","string"],
  ["shadowcasting/spellcasting","string"],
  ["base will save","string"],
  ["region of origin","string"],
  ["base fortitude save","string"],
  ["taint","string"],
  ["base fort save","number"],
  ["powers","string"],
  ["speak language","string"],
  ["saving throws","string"],
  ["invocations","string"],
  ["bave save bonus","string"],
  ["subtype","string"],
  ["domain","string"],
  ["patron","string"],
  ["base unarmed attack bonus","string"],
  ["other","string"],
  ["weapon proficiency","string"],
  ["region","string"],
  ["religion","string"],
  ["warlock invocation","string"],
  ["race/type","string"],
  ["natural armor bonus","string"],
  ["scar of unlife","string"],
  ["essentia pool","number"],
  ["additional feats","string"],
  ["meldshaping","string"],
  ["martial stances","string"],
  ["oath to the weave","string"],
  ["heavy armor proficiency","string"],
  ["associated classes","string"],
  ["associated skills","string"],
  ["dues","string"],
  ["spells or spell like abilities","string"],
  ["ability score","string"],
  ["mysteries/spellcasting","number"],
  ["shadowcasting","string"],
  ["proficiency","string"],
  ["special requirements","string"],
  ["proficiencies","string"],
  ["martial stancess","string"],
  ["deity","string"],
  ["base reflex save","string"],
  ["advancement","string"],
  ["creature type","string"],
  ["domains","string"],
  ["spell","string"],
  ["dexterity","string"],
  ["manifesting","string"]
]